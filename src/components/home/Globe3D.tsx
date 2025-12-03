'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Search, X, Briefcase, Wrench } from 'lucide-react';
import salesLocations from '@/data/salesLocations.json';
import technicalLocations from '@/data/technicalLocations.json';

interface Location {
  id: number;
  name: string;
  city: string;
  lat: number;
  lon: number;
  description: string;
  offices: number;
  employees: number;
  type: 'sales' | 'technical';
}

interface Globe3DProps {
  darkMode?: boolean;
}

export default function Globe3D({ darkMode = false }: Globe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const cameraRef = useRef<THREE.Camera | null>(null);
  const pinGroupRef = useRef<THREE.Group | null>(null);
  const atmosphereRef = useRef<THREE.Mesh | null>(null);



  const pinMeshesRef = useRef<THREE.Object3D[]>([]);
  
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'sales' | 'technical'>('sales');
  const [searchQuery, setSearchQuery] = useState('');

  const locations: Location[] = [
    ...salesLocations.map((loc) => ({ ...loc, type: 'sales' as const })),
    ...technicalLocations.map((loc) => ({ ...loc, type: 'technical' as const }))
  ];

  // Filter locations based on active tab and search query
  const filteredLocations = locations.filter(loc => {
    const matchesTab = loc.type === activeTab;
    if (!searchQuery.trim()) return matchesTab;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      loc.name.toLowerCase().indexOf(query) !== -1 ||
      loc.city.toLowerCase().indexOf(query) !== -1 ||
      loc.description.toLowerCase().indexOf(query) !== -1;
    
    return matchesTab && matchesSearch;
  });

  const filteredLocationsRef = useRef<Location[]>([]);
  filteredLocationsRef.current = filteredLocations;
  // Function to rotate globe to location
  const rotateToLocation = (location: Location) => {
    if (!earthRef.current || !pinGroupRef.current || !atmosphereRef.current) return;

    const targetLat = location.lat;
    const targetLon = location.lon;

    const targetVector = new THREE.Vector3(
      -Math.sin((Math.PI / 180) * targetLon) * Math.cos((Math.PI / 180) * targetLat),
       Math.sin((Math.PI / 180) * targetLat),
       Math.cos((Math.PI / 180) * targetLon) * Math.cos((Math.PI / 180) * targetLat)
    );
    
    // yaw: rotate around Y so the point faces -Z
    const targetRotationY = Math.atan2(targetVector.x, targetVector.z);
    
    // pitch: rotate around X so the latitude lines up
    const targetRotationX = -Math.asin(targetVector.y / targetVector.length());

    console.log(targetRotationY, targetRotationX);
    // Get current rotations
    const earth = earthRef.current;
    const pinGroup = pinGroupRef.current;
    const atmosphere = atmosphereRef.current;

    const startRotationY = earth.rotation.y;
    const startRotationX = earth.rotation.x;

    // Animate rotation
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentRotationY = startRotationY + (targetRotationY - startRotationY) * eased;
      const currentRotationX = startRotationX + (targetRotationX - startRotationX) * eased;

      earth.rotation.y = currentRotationY;
      earth.rotation.x = currentRotationX;
      pinGroup.rotation.y = currentRotationY;
      pinGroup.rotation.x = currentRotationX;
      atmosphere.rotation.y = currentRotationY;
      atmosphere.rotation.x = currentRotationX;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  // Update Earth material when darkMode changes
  useEffect(() => {
    if (!earthRef.current) return;
    
    const textureLoader = new THREE.TextureLoader();
    const texturePath = darkMode 
      ? '/images/textures/earth-texture-dark.jpg'
      : '/images/textures/earth-texture.jpg';

    textureLoader.load(
      texturePath,
      (texture) => {
        if (earthRef.current) {
          (earthRef.current.material as THREE.MeshPhongMaterial).map = texture;
          (earthRef.current.material as THREE.MeshPhongMaterial).needsUpdate = true;
        }
      },
      undefined,
      () => {
        console.warn('Failed to load texture, using default');
      }
    );
  }, [darkMode]);

  // Recreate pins when activeTab changes
// Recreate pins when activeTab, search, or darkMode changes
useEffect(() => {
  if (!pinGroupRef.current || !sceneRef.current) return;

  // Clear existing pins
  while (pinGroupRef.current.children.length > 0) {
    const child = pinGroupRef.current.children[0];
    pinGroupRef.current.remove(child);
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      if (child.material instanceof THREE.Material) {
        child.material.dispose();
      }
    }
  }

  const pinColor = activeTab === 'sales' ? 0x3b82f6 : 0xf97316;
  const emissiveColor = activeTab === 'sales' ? 0x1e40af : 0xc2410c;

  pinMeshesRef.current = [];

  filteredLocations.forEach(location => {
    const phi = (90 - location.lat) * (Math.PI / 180);
    const theta = (location.lon + 180) * (Math.PI / 180);
    const radius = 1.02;

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Create simple dot pin
    const dotGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const dotMaterial = new THREE.MeshPhongMaterial({
      color: pinColor,
      emissive: emissiveColor,
      emissiveIntensity: darkMode ? 0.8 : 0.5,
      shininess: 100
    });
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    dot.position.set(x, y, z);
    dot.userData = { locationId: location.id };
    
    // Add glow ring
    const glowGeometry = new THREE.RingGeometry(0.035, 0.045, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: pinColor,
      transparent: true,
      opacity: darkMode ? 0.7 : 0.5,
      side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(x, y, z);
    glow.lookAt(0, 0, 0);
    glow.userData = { locationId: location.id };
    
    pinGroupRef.current?.add(dot);
    pinGroupRef.current?.add(glow);
    pinMeshesRef.current.push(dot);
  });

  if (selectedLocation && selectedLocation.type !== activeTab) {
    setSelectedLocation(null);
  }

}, [activeTab, filteredLocations, darkMode]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Create Earth with texture
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    const earthTexture = textureLoader.load(
      '/images/textures/earth-texture.jpg',
      () => {
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
        setIsLoaded(true);
      }
    );

    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      specular: darkMode ? 0x111111 : 0x333333,
      shininess: darkMode ? 10 : 15,
      emissive: darkMode ? 0x0a0a0a : 0x000000,
    });

    const earth = new THREE.Mesh(geometry, material);
    earthRef.current = earth;
    scene.add(earth);

    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: darkMode ? 0x4466aa : 0x6699ff,
      transparent: true,
      opacity: darkMode ? 0.08 : 0.12,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    atmosphereRef.current = atmosphere;
    scene.add(atmosphere);

    // Create pin group
    const pinGroup = new THREE.Group();
    pinGroupRef.current = pinGroup;
    scene.add(pinGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, darkMode ? 0.5 : 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, darkMode ? 0.6 : 0.9);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let hasDragged = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      hasDragged = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
 
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
 
      if (!isDragging) return;

      // Dragging
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDragged = true;
      }

      const rotationY = deltaX * 0.005;
      const rotationX = deltaY * 0.005;

      earth.rotation.y += rotationY;
      earth.rotation.x += rotationX;
      atmosphere.rotation.y += rotationY;
      atmosphere.rotation.x += rotationX;
      pinGroup.rotation.y += rotationY;
      pinGroup.rotation.x += rotationX;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      isDragging = false;

      if (!hasDragged) {
        const rect = mountRef.current?.getBoundingClientRect();
        if (!rect) return;

        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(pinMeshesRef.current, true);
        
        if (intersects.length > 0) {
          const locationId = intersects[0].object.userData.locationId;
          const location = filteredLocationsRef.current.find(loc => loc.id === locationId);
          if (location) {
            setSelectedLocation(location);
            rotateToLocation(location);
          }
        }
      }
    };

    // Touch controls
    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      hasDragged = false;
      previousMousePosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
        hasDragged = true;
      }

      const rotationY = deltaX * 0.005;
      const rotationX = deltaY * 0.005;

      earth.rotation.y += rotationY;
      earth.rotation.x += rotationX;
      atmosphere.rotation.y += rotationY;
      atmosphere.rotation.x += rotationX;
      pinGroup.rotation.y += rotationY;
      pinGroup.rotation.x += rotationX;

      previousMousePosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      isDragging = false;

      if (!hasDragged && e.changedTouches[0]) {
        const rect = mountRef.current?.getBoundingClientRect();
        if (!rect) return;

        const touch = e.changedTouches[0];
        mouseRef.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

        raycasterRef.current.setFromCamera(mouseRef.current, camera);
        const intersects = raycasterRef.current.intersectObjects(pinGroup.children);
        
        if (intersects.length > 0) {
          const locationId = intersects[0].object.userData.locationId;
          const location = filteredLocationsRef.current.find(loc => loc.id === locationId);
          if (location) {
            setSelectedLocation(location);
            rotateToLocation(location);
          }
        }
      }
    };

    // Add event listeners
    const currentMount = mountRef.current;
    currentMount.addEventListener('mousedown', handleMouseDown);
    currentMount.addEventListener('mousemove', handleMouseMove);
    currentMount.addEventListener('mouseup', handleMouseUp);
    currentMount.addEventListener('mouseleave', () => {
      isDragging = false;
    });
    currentMount.addEventListener('touchstart', handleTouchStart);
    currentMount.addEventListener('touchmove', handleTouchMove);
    currentMount.addEventListener('touchend', handleTouchEnd);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeEventListener('mousedown', handleMouseDown);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('mouseup', handleMouseUp);
      currentMount.removeEventListener('touchstart', handleTouchStart);
      currentMount.removeEventListener('touchmove', handleTouchMove);
      currentMount.removeEventListener('touchend', handleTouchEnd);
      currentMount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      earthTexture.dispose();
      renderer.dispose();
    };
  }, [darkMode]);

  // Handle location click from sidebar
  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    rotateToLocation(location);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      {/* 3D Globe */}
      <div className="lg:col-span-2">
        <div className="backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-10">
              <div className={darkMode ? 'text-white' : 'text-gray-900'}>
                Loading Earth Texture...
              </div>
            </div>
          )}
          
          <div className="relative">
            <div 
              ref={mountRef} 
              className="w-full aspect-square rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-transparent"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>
      </div>

      {/* Improved Sidebar */}
      <div className="lg:col-span-1">
        <div className={`backdrop-blur-sm rounded-3xl p-10 sticky top-8 min-h-[600px] transition-all duration-500 ${
          selectedLocation ? 'ring-2 ring-cyan-400 shadow-2xl shadow-cyan-500/20' : ''
        }`}>
          
          {/* Pill Toggle */}
          {!selectedLocation && (
            <div className={`rounded-full p-1.5 flex gap-1 mb-6 ${
              darkMode ? 'bg-white/5' : 'bg-gray-200'
            }`}>
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex-1 px-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                  activeTab === 'sales'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : darkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Briefcase size={16} />
                Sales
              </button>
              <button
                onClick={() => setActiveTab('technical')}
                className={`flex-1 px-4 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                  activeTab === 'technical'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : darkMode ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Wrench size={16} />
                Technical
              </button>
            </div>
          )}

          {selectedLocation ? (
            // Selected Location View
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <button
                onClick={() => setSelectedLocation(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-200 text-gray-900'
                }`}
              >
                <X size={20} />
              </button>

              <div>
                <div className={`text-sm font-medium mb-2 flex items-center gap-2 ${
                  darkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  {selectedLocation.type === 'sales' ? <Briefcase size={16} /> : <Wrench size={16} />}
                  {selectedLocation.type.toUpperCase()} LOCATION
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedLocation.city}
                </h3>
                <p className={darkMode ? 'text-white/60' : 'text-gray-600'}>
                  {selectedLocation.name}
                </p>
              </div>

              <div className={`h-px ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>

              <div>
                <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  FUNCTION
                </div>
                <p className={darkMode ? 'text-white/80' : 'text-gray-700'}>
                  {selectedLocation.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-xl p-4 ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLocation.offices}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    Offices
                  </div>
                </div>
                <div className={`rounded-xl p-4 ${darkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <div className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedLocation.employees}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                    Employees
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Contact This Office
              </button>
            </div>
          ) : (
            // Default Location List View with Search
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    darkMode 
                      ? 'bg-white/5 text-white border-white/10 placeholder-gray-500' 
                      : 'bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="text-center">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activeTab === 'sales' ? 'Sales Offices' : 'Technical Centers'}
                </h3>
                <p className={`text-sm mb-6 ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} {searchQuery ? 'found' : 'worldwide'}
                </p>
              </div>
              
              {/* Location List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {filteredLocations.length === 0 ? (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    No locations found
                  </div>
                ) : (
                  filteredLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationClick(location)}
                      className={`w-full p-3 rounded-xl transition-all text-left ${
                        darkMode 
                          ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                          : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      <div className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {location.city}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                        {location.name}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}