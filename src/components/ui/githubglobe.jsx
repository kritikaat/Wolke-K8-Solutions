"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const GithubGlobe = () => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const globeRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Use the container's width for aspect ratio calculation
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerWidth; // Square aspect ratio
    
    const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    camera.position.z = 200;
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create world map texture
    const createWorldMapTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // Background color (ocean) - more GitHub-like dark blue
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw continents with GitHub's color scheme
      ctx.fillStyle = '#161b22';
      
      // Draw a simple world map (very simplified continents)
      // North America
      ctx.beginPath();
      ctx.moveTo(150, 120);
      ctx.lineTo(250, 80);
      ctx.lineTo(300, 160);
      ctx.lineTo(280, 230);
      ctx.lineTo(170, 240);
      ctx.closePath();
      ctx.fill();
      
      // South America
      ctx.beginPath();
      ctx.moveTo(280, 260);
      ctx.lineTo(320, 280);
      ctx.lineTo(300, 400);
      ctx.lineTo(250, 430);
      ctx.lineTo(230, 380);
      ctx.closePath();
      ctx.fill();
      
      // Europe
      ctx.beginPath();
      ctx.moveTo(480, 100);
      ctx.lineTo(550, 80);
      ctx.lineTo(570, 140);
      ctx.lineTo(520, 170);
      ctx.lineTo(470, 150);
      ctx.closePath();
      ctx.fill();
      
      // Africa
      ctx.beginPath();
      ctx.moveTo(480, 180);
      ctx.lineTo(560, 170);
      ctx.lineTo(580, 300);
      ctx.lineTo(520, 350);
      ctx.lineTo(470, 310);
      ctx.closePath();
      ctx.fill();
      
      // Asia
      ctx.beginPath();
      ctx.moveTo(580, 80);
      ctx.lineTo(750, 100);
      ctx.lineTo(800, 200);
      ctx.lineTo(700, 280);
      ctx.lineTo(580, 230);
      ctx.closePath();
      ctx.fill();
      
      // Australia
      ctx.beginPath();
      ctx.moveTo(800, 300);
      ctx.lineTo(850, 290);
      ctx.lineTo(870, 350);
      ctx.lineTo(820, 380);
      ctx.lineTo(790, 350);
      ctx.closePath();
      ctx.fill();
      
      // Add a subtle grid pattern with GitHub colors
      ctx.strokeStyle = '#30363d';
      ctx.lineWidth = 0.5;
      
      // Draw longitude lines
      for (let i = 0; i <= canvas.width; i += canvas.width / 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      // Draw latitude lines
      for (let i = 0; i <= canvas.height; i += canvas.height / 12) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      return new THREE.CanvasTexture(canvas);
    };
    
    // Create textures
    const worldMapTexture = createWorldMapTexture();
    
    // Add ambient light to make globe more visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add directional light for better visibility
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Globe with world map texture - GitHub-style
    const globeGeometry = new THREE.SphereGeometry(100, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: worldMapTexture,
      transparent: false,
      shininess: 5,
      specular: 0x222222
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;
    
    // Sample locations with GitHub-like data points
    const locations = [
    
{ name: "Rome", lat: 41.9028, lng: 12.4964, value: 8 },
{ name: "Bangkok", lat: 13.7563, lng: 100.5018, value: 8 },
{ name: "Istanbul", lat: 41.0082, lng: 28.9784, value: 7 },
{ name: "Jakarta", lat: -6.2088, lng: 106.8456, value: 8 },
{ name: "Manila", lat: 14.5995, lng: 120.9842, value: 7 },
{ name: "Lagos", lat: 6.5244, lng: 3.3792, value: 9 },
{ name: "Cairo", lat: 30.0444, lng: 31.2357, value: 8 },
{ name: "Madrid", lat: 40.4168, lng: -3.7038, value: 7 },
{ name: "Johannesburg", lat: -26.2041, lng: 28.0473, value: 8 },
{ name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, value: 7 },
{ name: "Vienna", lat: 48.2082, lng: 16.3738, value: 6 },
{ name: "Brussels", lat: 50.8503, lng: 4.3517, value: 6 },
{ name: "Warsaw", lat: 52.2297, lng: 21.0122, value: 7 },
{ name: "Budapest", lat: 47.4979, lng: 19.0402, value: 6 },
{ name: "Athens", lat: 37.9838, lng: 23.7275, value: 7 },
{ name: "Prague", lat: 50.0755, lng: 14.4378, value: 7 },
{ name: "Santiago", lat: -33.4489, lng: -70.6693, value: 6 },
{ name: "Lima", lat: -12.0464, lng: -77.0428, value: 7 },
{ name: "Bogotá", lat: 4.7110, lng: -74.0721, value: 8 },
{ name: "Buenos Aires", lat: -34.6037, lng: -58.3816, value: 7 },
{ name: "Helsinki", lat: 60.1699, lng: 24.9384, value: 6 },
{ name: "Oslo", lat: 59.9139, lng: 10.7522, value: 6 },
{ name: "Copenhagen", lat: 55.6761, lng: 12.5683, value: 7 },
{ name: "Dublin", lat: 53.3498, lng: -6.2603, value: 6 },
{ name: "Lisbon", lat: 38.7223, lng: -9.1393, value: 7 },
{ name: "Zurich", lat: 47.3769, lng: 8.5417, value: 7 },
{ name: "Geneva", lat: 46.2044, lng: 6.1432, value: 6 },
{ name: "Vancouver", lat: 49.2827, lng: -123.1207, value: 7 },
{ name: "Montreal", lat: 45.5017, lng: -73.5673, value: 7 },
{ name: "Chicago", lat: 41.8781, lng: -87.6298, value: 8 },
{ name: "Los Angeles", lat: 34.0522, lng: -118.2437, value: 9 },
{ name: "Dallas", lat: 32.7767, lng: -96.7970, value: 7 },
{ name: "Miami", lat: 25.7617, lng: -80.1918, value: 8 },
{ name: "Seattle", lat: 47.6062, lng: -122.3321, value: 7 },
{ name: "Boston", lat: 42.3601, lng: -71.0589, value: 7 },
{ name: "Austin", lat: 30.2672, lng: -97.7431, value: 8 },
{ name: "Houston", lat: 29.7604, lng: -95.3698, value: 7 },
{ name: "Phoenix", lat: 33.4484, lng: -112.0740, value: 6 },
{ name: "Honolulu", lat: 21.3069, lng: -157.8583, value: 5 },
{ name: "Cancun", lat: 21.1619, lng: -86.8515, value: 6 },
{ name: "Havana", lat: 23.1136, lng: -82.3666, value: 5 },
{ name: "Panama City", lat: 8.9836, lng: -79.5197, value: 6 },
{ name: "Montevideo", lat: -34.9011, lng: -56.1915, value: 5 },
{ name: "Quito", lat: -0.1807, lng: -78.4678, value: 6 },
{ name: "Reykjavik", lat: 64.1466, lng: -21.9426, value: 5 },
{ name: "Casablanca", lat: 33.5731, lng: -7.5898, value: 7 },
{ name: "Nairobi", lat: -1.2921, lng: 36.8219, value: 8 },
{ name: "Addis Ababa", lat: 9.0320, lng: 38.7472, value: 7 },
{ name: "Dar es Salaam", lat: -6.7924, lng: 39.2083, value: 7 },
{ name: "Accra", lat: 5.6037, lng: -0.1870, value: 7 },
{ name: "Abuja", lat: 9.0765, lng: 7.3986, value: 6 },
{ name: "Tunis", lat: 36.8065, lng: 10.1815, value: 6 },
{ name: "Marrakech", lat: 31.6295, lng: -7.9811, value: 7 },
{ name: "Tel Aviv", lat: 32.0853, lng: 34.7818, value: 8 },
{ name: "Beirut", lat: 33.8938, lng: 35.5018, value: 6 },
{ name: "Amman", lat: 31.9454, lng: 35.9284, value: 6 },
{ name: "Riyadh", lat: 24.7136, lng: 46.6753, value: 7 },
{ name: "Doha", lat: 25.2854, lng: 51.5310, value: 8 },
{ name: "Abu Dhabi", lat: 24.4539, lng: 54.3773, value: 8 },
{ name: "Muscat", lat: 23.5880, lng: 58.3829, value: 6 },
{ name: "Tehran", lat: 35.6892, lng: 51.3890, value: 7 },
{ name: "Baghdad", lat: 33.3152, lng: 44.3661, value: 5 },
{ name: "Kabul", lat: 34.5553, lng: 69.2075, value: 4 },
{ name: "Islamabad", lat: 33.6844, lng: 73.0479, value: 6 },
{ name: "Karachi", lat: 24.8607, lng: 67.0011, value: 8 },
{ name: "New Delhi", lat: 28.6139, lng: 77.2090, value: 9 },
{ name: "Kolkata", lat: 22.5726, lng: 88.3639, value: 8 },
{ name: "Chennai", lat: 13.0827, lng: 80.2707, value: 8 },
{ name: "Hyderabad", lat: 17.3850, lng: 78.4867, value: 8 },
{ name: "Kathmandu", lat: 27.7172, lng: 85.3240, value: 6 },
{ name: "Dhaka", lat: 23.8103, lng: 90.4125, value: 9 },
{ name: "Colombo", lat: 6.9271, lng: 79.8612, value: 7 },
{ name: "Yangon", lat: 16.8661, lng: 96.1951, value: 7 },
{ name: "Phnom Penh", lat: 11.5564, lng: 104.9282, value: 6 },
{ name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297, value: 8 },
{ name: "Hanoi", lat: 21.0278, lng: 105.8342, value: 7 },
{ name: "Shanghai", lat: 31.2304, lng: 121.4737, value: 10 },
{ name: "Hong Kong", lat: 22.3193, lng: 114.1694, value: 9 },
{ name: "Taipei", lat: 25.0330, lng: 121.5654, value: 8 },
{ name: "Osaka", lat: 34.6937, lng: 135.5023, value: 8 },
{ name: "Kyoto", lat: 35.0116, lng: 135.7681, value: 7 },
{ name: "Busan", lat: 35.1796, lng: 129.0756, value: 7 },
{ name: "Manila", lat: 14.5995, lng: 120.9842, value: 8 },
{ name: "Perth", lat: -31.9505, lng: 115.8605, value: 6 },
{ name: "Melbourne", lat: -37.8136, lng: 144.9631, value: 8 },
{ name: "Brisbane", lat: -27.4698, lng: 153.0251, value: 7 },
{ name: "Auckland", lat: -36.8509, lng: 174.7645, value: 7 },
{ name: "Wellington", lat: -41.2865, lng: 174.7762, value: 5 },
{ name: "Suva", lat: -18.1416, lng: 178.4419, value: 4 },
{ name: "Port Moresby", lat: -9.4438, lng: 147.1803, value: 5 },
{ name: "Sao Luis", lat: -2.5391, lng: -44.2829, value: 6 },
{ name: "Fortaleza", lat: -3.7319, lng: -38.5267, value: 7 },
{ name: "Salvador", lat: -12.9714, lng: -38.5014, value: 7 },
{ name: "Caracas", lat: 10.4806, lng: -66.9036, value: 5 },
{ name: "Medellín", lat: 6.2476, lng: -75.5658, value: 7 },
{ name: "Cartagena", lat: 10.3932, lng: -75.4832, value: 6 },
{ name: "Guayaquil", lat: -2.1962, lng: -79.8862, value: 6 },
{ name: "Cusco", lat: -13.5320, lng: -71.9675, value: 6 },
// North America
{ name: "New York", lat: 40.7128, lng: -74.0060, value: 10 },
{ name: "Los Angeles", lat: 34.0522, lng: -118.2437, value: 9 },
{ name: "Chicago", lat: 41.8781, lng: -87.6298, value: 8 },
{ name: "Toronto", lat: 43.6532, lng: -79.3832, value: 8 },
{ name: "Mexico City", lat: 19.4326, lng: -99.1332, value: 9 },
{ name: "Vancouver", lat: 49.2827, lng: -123.1207, value: 7 },
{ name: "Montreal", lat: 45.5017, lng: -73.5673, value: 7 },
{ name: "San Francisco", lat: 37.7749, lng: -122.4194, value: 8 },
{ name: "Miami", lat: 25.7617, lng: -80.1918, value: 8 },
{ name: "Dallas", lat: 32.7767, lng: -96.7970, value: 7 },
{ name: "Houston", lat: 29.7604, lng: -95.3698, value: 7 },
{ name: "Atlanta", lat: 33.7490, lng: -84.3880, value: 7 },
{ name: "Washington DC", lat: 38.9072, lng: -77.0369, value: 8 },
{ name: "Seattle", lat: 47.6062, lng: -122.3321, value: 7 },
{ name: "Boston", lat: 42.3601, lng: -71.0589, value: 7 },
{ name: "Philadelphia", lat: 39.9526, lng: -75.1652, value: 7 },
{ name: "Denver", lat: 39.7392, lng: -104.9903, value: 6 },
{ name: "Phoenix", lat: 33.4484, lng: -112.0740, value: 6 },
{ name: "Calgary", lat: 51.0447, lng: -114.0719, value: 6 },
{ name: "Ottawa", lat: 45.4215, lng: -75.6972, value: 6 },
{ name: "Guadalajara", lat: 20.6597, lng: -103.3496, value: 7 },
{ name: "Monterrey", lat: 25.6866, lng: -100.3161, value: 7 },
{ name: "Havana", lat: 23.1136, lng: -82.3666, value: 6 },
{ name: "San José", lat: 9.9281, lng: -84.0907, value: 5 },
{ name: "Panama City", lat: 8.9836, lng: -79.5197, value: 6 },

// South America
{ name: "São Paulo", lat: -23.5505, lng: -46.6333, value: 9 },
{ name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, value: 8 },
{ name: "Buenos Aires", lat: -34.6037, lng: -58.3816, value: 8 },
{ name: "Bogotá", lat: 4.7110, lng: -74.0721, value: 8 },
{ name: "Lima", lat: -12.0464, lng: -77.0428, value: 7 },
{ name: "Santiago", lat: -33.4489, lng: -70.6693, value: 7 },
{ name: "Caracas", lat: 10.4806, lng: -66.9036, value: 6 },
{ name: "Quito", lat: -0.1807, lng: -78.4678, value: 6 },
{ name: "Medellín", lat: 6.2476, lng: -75.5658, value: 7 },
{ name: "Montevideo", lat: -34.9011, lng: -56.1915, value: 5 },
{ name: "Brasília", lat: -15.7975, lng: -47.8919, value: 7 },
{ name: "Salvador", lat: -12.9714, lng: -38.5014, value: 7 },
{ name: "Belo Horizonte", lat: -19.9167, lng: -43.9345, value: 6 },
{ name: "Porto Alegre", lat: -30.0277, lng: -51.2287, value: 6 },
{ name: "Recife", lat: -8.0539, lng: -34.8811, value: 6 },
{ name: "Fortaleza", lat: -3.7319, lng: -38.5267, value: 7 },
{ name: "Guayaquil", lat: -2.1962, lng: -79.8862, value: 6 },
{ name: "La Paz", lat: -16.4897, lng: -68.1193, value: 6 },
{ name: "Asunción", lat: -25.2637, lng: -57.5759, value: 5 },
{ name: "Curitiba", lat: -25.4290, lng: -49.2671, value: 6 },

// Europe
{ name: "London", lat: 51.5074, lng: -0.1278, value: 10 },
{ name: "Paris", lat: 48.8566, lng: 2.3522, value: 9 },
{ name: "Berlin", lat: 52.5200, lng: 13.4050, value: 8 },
{ name: "Madrid", lat: 40.4168, lng: -3.7038, value: 8 },
{ name: "Rome", lat: 41.9028, lng: 12.4964, value: 8 },
{ name: "Amsterdam", lat: 52.3676, lng: 4.9041, value: 7 },
{ name: "Moscow", lat: 55.7558, lng: 37.6173, value: 9 },
{ name: "Barcelona", lat: 41.3851, lng: 2.1734, value: 7 },
{ name: "Vienna", lat: 48.2082, lng: 16.3738, value: 7 },
{ name: "Stockholm", lat: 59.3293, lng: 18.0686, value: 7 },
{ name: "Copenhagen", lat: 55.6761, lng: 12.5683, value: 7 },
{ name: "Brussels", lat: 50.8503, lng: 4.3517, value: 7 },
{ name: "Lisbon", lat: 38.7223, lng: -9.1393, value: 7 },
{ name: "Prague", lat: 50.0755, lng: 14.4378, value: 7 },
{ name: "Dublin", lat: 53.3498, lng: -6.2603, value: 7 },
{ name: "Athens", lat: 37.9838, lng: 23.7275, value: 7 },
{ name: "Helsinki", lat: 60.1699, lng: 24.9384, value: 6 },
{ name: "Oslo", lat: 59.9139, lng: 10.7522, value: 6 },
{ name: "Warsaw", lat: 52.2297, lng: 21.0122, value: 7 },
{ name: "Budapest", lat: 47.4979, lng: 19.0402, value: 7 },
{ name: "Zurich", lat: 47.3769, lng: 8.5417, value: 7 },
{ name: "Munich", lat: 48.1351, lng: 11.5820, value: 7 },
{ name: "Milan", lat: 45.4642, lng: 9.1900, value: 7 },
{ name: "Hamburg", lat: 53.5511, lng: 9.9937, value: 6 },
{ name: "Frankfurt", lat: 50.1109, lng: 8.6821, value: 7 },
{ name: "St. Petersburg", lat: 59.9311, lng: 30.3609, value: 7 },
{ name: "Istanbul", lat: 41.0082, lng: 28.9784, value: 9 },
{ name: "Kiev", lat: 50.4501, lng: 30.5234, value: 7 },
{ name: "Belgrade", lat: 44.7866, lng: 20.4489, value: 6 },
{ name: "Bucharest", lat: 44.4268, lng: 26.1025, value: 7 },

// Africa
{ name: "Cairo", lat: 30.0444, lng: 31.2357, value: 9 },
{ name: "Lagos", lat: 6.5244, lng: 3.3792, value: 9 },
{ name: "Johannesburg", lat: -26.2041, lng: 28.0473, value: 8 },
{ name: "Nairobi", lat: -1.2921, lng: 36.8219, value: 8 },
{ name: "Cape Town", lat: -33.9249, lng: 18.4241, value: 7 },
{ name: "Casablanca", lat: 33.5731, lng: -7.5898, value: 7 },
{ name: "Addis Ababa", lat: 9.0320, lng: 38.7472, value: 8 },
{ name: "Algiers", lat: 36.7538, lng: 3.0588, value: 7 },
{ name: "Dar es Salaam", lat: -6.7924, lng: 39.2083, value: 7 },
{ name: "Accra", lat: 5.6037, lng: -0.1870, value: 7 },
{ name: "Tunis", lat: 36.8065, lng: 10.1815, value: 6 },
{ name: "Durban", lat: -29.8587, lng: 31.0218, value: 6 },
{ name: "Dakar", lat: 14.7167, lng: -17.4677, value: 7 },
{ name: "Abidjan", lat: 5.3600, lng: -4.0083, value: 7 },
{ name: "Khartoum", lat: 15.5007, lng: 32.5599, value: 7 },
{ name: "Abuja", lat: 9.0765, lng: 7.3986, value: 7 },
{ name: "Kigali", lat: -1.9706, lng: 30.1044, value: 6 },
{ name: "Kampala", lat: 0.3476, lng: 32.5825, value: 7 },
{ name: "Luanda", lat: -8.8159, lng: 13.2306, value: 7 },
{ name: "Harare", lat: -17.8252, lng: 31.0335, value: 6 },

// Middle East
{ name: "Dubai", lat: 25.2048, lng: 55.2708, value: 9 },
{ name: "Riyadh", lat: 24.7136, lng: 46.6753, value: 8 },
{ name: "Tel Aviv", lat: 32.0853, lng: 34.7818, value: 8 },
{ name: "Abu Dhabi", lat: 24.4539, lng: 54.3773, value: 8 },
{ name: "Doha", lat: 25.2854, lng: 51.5310, value: 8 },
{ name: "Tehran", lat: 35.6892, lng: 51.3890, value: 8 },
{ name: "Beirut", lat: 33.8938, lng: 35.5018, value: 6 },
{ name: "Amman", lat: 31.9454, lng: 35.9284, value: 6 },
{ name: "Jeddah", lat: 21.5433, lng: 39.1728, value: 7 },
{ name: "Muscat", lat: 23.5880, lng: 58.3829, value: 6 },
{ name: "Baghdad", lat: 33.3152, lng: 44.3661, value: 7 },
{ name: "Kuwait City", lat: 29.3759, lng: 47.9774, value: 7 },
{ name: "Manama", lat: 26.2285, lng: 50.5860, value: 6 },
{ name: "Jerusalem", lat: 31.7683, lng: 35.2137, value: 7 },
{ name: "Damascus", lat: 33.5138, lng: 36.2765, value: 6 },

// Asia (East, South, and Southeast)
{ name: "Tokyo", lat: 35.6762, lng: 139.6503, value: 10 },
{ name: "Beijing", lat: 39.9042, lng: 116.4074, value: 10 },
{ name: "Shanghai", lat: 31.2304, lng: 121.4737, value: 10 },
{ name: "Hong Kong", lat: 22.3193, lng: 114.1694, value: 9 },
{ name: "Singapore", lat: 1.3521, lng: 103.8198, value: 9 },
{ name: "Seoul", lat: 37.5665, lng: 126.9780, value: 9 },
{ name: "Delhi", lat: 28.6139, lng: 77.2090, value: 10 },
{ name: "Mumbai", lat: 19.0760, lng: 72.8777, value: 9 },
{ name: "Bangalore", lat: 12.9716, lng: 77.5946, value: 8 },
{ name: "Jakarta", lat: -6.2088, lng: 106.8456, value: 9 },
{ name: "Manila", lat: 14.5995, lng: 120.9842, value: 8 },
{ name: "Bangkok", lat: 13.7563, lng: 100.5018, value: 8 },
{ name: "Guangzhou", lat: 23.1291, lng: 113.2644, value: 9 },
{ name: "Shenzhen", lat: 22.5431, lng: 114.0579, value: 9 },
{ name: "Osaka", lat: 34.6937, lng: 135.5023, value: 8 },
{ name: "Taipei", lat: 25.0330, lng: 121.5654, value: 8 },
{ name: "Kuala Lumpur", lat: 3.1390, lng: 101.6869, value: 8 },
{ name: "Ho Chi Minh City", lat: 10.8231, lng: 106.6297, value: 8 },
{ name: "Hanoi", lat: 21.0278, lng: 105.8342, value: 7 },
{ name: "Chengdu", lat: 30.5728, lng: 104.0668, value: 8 },
{ name: "Kolkata", lat: 22.5726, lng: 88.3639, value: 8 },
{ name: "Chennai", lat: 13.0827, lng: 80.2707, value: 8 },
{ name: "Hyderabad", lat: 17.3850, lng: 78.4867, value: 8 },
{ name: "Lahore", lat: 31.5204, lng: 74.3587, value: 8 },
{ name: "Karachi", lat: 24.8607, lng: 67.0011, value: 9 },
{ name: "Dhaka", lat: 23.8103, lng: 90.4125, value: 9 },
{ name: "Yangon", lat: 16.8661, lng: 96.1951, value: 7 },
{ name: "Wuhan", lat: 30.5928, lng: 114.3055, value: 8 },
{ name: "Tianjin", lat: 39.3434, lng: 117.3616, value: 8 },
{ name: "Chongqing", lat: 29.4316, lng: 106.9123, value: 8 },
{ name: "Xi'an", lat: 34.3416, lng: 108.9398, value: 7 },
{ name: "Hangzhou", lat: 30.2741, lng: 120.1552, value: 7 },
{ name: "Suzhou", lat: 31.2990, lng: 120.5853, value: 7 },
{ name: "Nanjing", lat: 32.0603, lng: 118.7969, value: 7 },
{ name: "Ahmedabad", lat: 23.0225, lng: 72.5714, value: 7 },
{ name: "Pune", lat: 18.5204, lng: 73.8567, value: 7 },
{ name: "Surat", lat: 21.1702, lng: 72.8311, value: 7 },
{ name: "Jaipur", lat: 26.9124, lng: 75.7873, value: 7 },
{ name: "Lucknow", lat: 26.8467, lng: 80.9462, value: 7 },
{ name: "Kanpur", lat: 26.4499, lng: 80.3319, value: 6 },
{ name: "Nagpur", lat: 21.1458, lng: 79.0882, value: 6 },
{ name: "Colombo", lat: 6.9271, lng: 79.8612, value: 7 },
{ name: "Kathmandu", lat: 27.7172, lng: 85.3240, value: 6 },
{ name: "Islamabad", lat: 33.6844, lng: 73.0479, value: 7 },
{ name: "Phnom Penh", lat: 11.5564, lng: 104.9282, value: 6 },
{ name: "Vientiane", lat: 17.9757, lng: 102.6331, value: 5 },

// Oceania
{ name: "Sydney", lat: -33.8688, lng: 151.2093, value: 8 },
{ name: "Melbourne", lat: -37.8136, lng: 144.9631, value: 8 },
{ name: "Brisbane", lat: -27.4698, lng: 153.0251, value: 7 },
{ name: "Perth", lat: -31.9505, lng: 115.8605, value: 7 },
{ name: "Auckland", lat: -36.8509, lng: 174.7645, value: 7 },
{ name: "Wellington", lat: -41.2865, lng: 174.7762, value: 6 },
{ name: "Adelaide", lat: -34.9285, lng: 138.6007, value: 6 },
{ name: "Christchurch", lat: -43.5320, lng: 172.6306, value: 6 },
{ name: "Gold Coast", lat: -28.0167, lng: 153.4000, value: 6 },
{ name: "Canberra", lat: -35.2809, lng: 149.1300, value: 6 },
{ name: "Hobart", lat: -42.8821, lng: 147.3272, value: 5 },
{ name: "Suva", lat: -18.1416, lng: 178.4419, value: 5 },
{ name: "Port Moresby", lat: -9.4438, lng: 147.1803, value: 5 },
{ name: "Nouméa", lat: -22.2758, lng: 166.4580, value: 4 },
{ name: "Papeete", lat: -17.5516, lng: -149.5584, value: 4 },
{ name: "Apia", lat: -13.8506, lng: -171.7513, value: 4 },
{ name: "Honiara", lat: -9.4438, lng: 159.9630, value: 4 },
{ name: "Port Vila", lat: -17.7334, lng: 168.3220, value: 4 },
{ name: "Nuku'alofa", lat: -21.1393, lng: -175.2046, value: 4 },

// Additional Major Cities
{ name: "Kyoto", lat: 35.0116, lng: 135.7681, value: 7 },
{ name: "Busan", lat: 35.1796, lng: 129.0756, value: 7 },
{ name: "Naples", lat: 40.8518, lng: 14.2681, value: 6 },
{ name: "Manchester", lat: 53.4808, lng: -2.2426, value: 6 },
{ name: "Lyon", lat: 45.7640, lng: 4.8357, value: 6 },
{ name: "Valencia", lat: 39.4699, lng: -0.3763, value: 6 },
{ name: "Krakow", lat: 50.0647, lng: 19.9450, value: 6 },
{ name: "Rotterdam", lat: 51.9244, lng: 4.4777, value: 6 },
{ name: "Göteborg", lat: 57.7089, lng: 11.9746, value: 5 },
{ name: "Antwerp", lat: 51.2194, lng: 4.4025, value: 6 },
{ name: "Porto", lat: 41.1579, lng: -8.6291, value: 6 },
{ name: "Marseille", lat: 43.2965, lng: 5.3698, value: 6 },
{ name: "Toulouse", lat: 43.6047, lng: 1.4442, value: 5 },
{ name: "Nice", lat: 43.7102, lng: 7.2620, value: 5 },
{ name: "Palermo", lat: 38.1157, lng: 13.3615, value: 5 },
{ name: "Florence", lat: 43.7696, lng: 11.2558, value: 6 },
{ name: "Seville", lat: 37.3891, lng: -5.9845, value: 6 },
{ name: "Bilbao", lat: 43.2630, lng: -2.9350, value: 5 },
{ name: "Glasgow", lat: 55.8642, lng: -4.2518, value: 6 },
{ name: "Edinburgh", lat: 55.9533, lng: -3.1883, value: 6 },
{ name: "Lviv", lat: 49.8397, lng: 24.0297, value: 5 },
{ name: "Odessa", lat: 46.4825, lng: 30.7233, value: 5 },
{ name: "Sofia", lat: 42.6977, lng: 23.3219, value: 6 },
{ name: "Thessaloniki", lat: 40.6401, lng: 22.9444, value: 5 },
{ name: "Minsk", lat: 53.9045, lng: 27.5615, value: 6 },
{ name: "Riga", lat: 56.9496, lng: 24.1052, value: 5 },
{ name: "Tallinn", lat: 59.4370, lng: 24.7536, value: 5 },
{ name: "Vilnius", lat: 54.6872, lng: 25.2797, value: 5 },
{ name: "Bratislava", lat: 48.1486, lng: 17.1077, value: 5 },
{ name: "Ljubljana", lat: 46.0569, lng: 14.5058, value: 5 },
{ name: "Zagreb", lat: 45.8150, lng: 15.9819, value: 5 },
{ name: "Sarajevo", lat: 43.8563, lng: 18.4131, value: 5 },
{ name: "Skopje", lat: 41.9973, lng: 21.4280, value: 5 },
{ name: "Tirana", lat: 41.3275, lng: 19.8187, value: 5 },
{ name: "Marrakech", lat: 31.6295, lng: -7.9811, value: 6 },
{ name: "Alexandria", lat: 31.2001, lng: 29.9187, value: 7 },
{ name: "Luxor", lat: 25.6872, lng: 32.6396, value: 5 },
{ name: "Fez", lat: 34.0181, lng: -5.0078, value: 5 },
{ name: "Tangier", lat: 35.7673, lng: -5.7994, value: 5 },
{ name: "Tripoli", lat: 32.8872, lng: 13.1913, value: 5 },
{ name: "Douala", lat: 4.0511, lng: 9.7679, value: 6 },
{ name: "Yaoundé", lat: 3.8480, lng: 11.5021, value: 6 },
{ name: "Port Louis", lat: -20.1609, lng: 57.5012, value: 4 },
{ name: "Windhoek", lat: -22.5609, lng: 17.0658, value: 5 },
{ name: "Gaborone", lat: -24.6282, lng: 25.9231, value: 5 },
{ name: "Lusaka", lat: -15.3875, lng: 28.3228, value: 6 },
{ name: "Maputo", lat: -25.9655, lng: 32.5832, value: 6 },
{ name: "Antananarivo", lat: -18.8792, lng: 47.5079, value: 6 },
{ name: "Bujumbura", lat: -3.3616, lng: 29.3599, value: 5 },
{ name: "Mogadishu", lat: 2.0469, lng: 45.3182, value: 6 },
{ name: "Conakry", lat: 9.6412, lng: -13.5784, value: 6 },
{ name: "Monrovia", lat: 6.3004, lng: -10.7969, value: 5 },
{ name: "Freetown", lat: 8.4816, lng: -13.2317, value: 5 },
{ name: "Bamako", lat: 12.6392, lng: -8.0029, value: 6 },
{ name: "Niamey", lat: 13.5117, lng: 2.1251, value: 5 },
{ name: "Ouagadougou", lat: 12.3714, lng: -1.5197, value: 6 },
{ name: "N'Djamena", lat: 12.1348, lng: 15.0557, value: 5 },
{ name: "Nouakchott", lat: 18.0735, lng: -15.9582, value: 5 },
{ name: "Libreville", lat: 0.4162, lng: 9.4673, value: 5 },
{ name: "Brazzaville", lat: -4.2634, lng: 15.2429, value: 5 },
{ name: "Kinshasa", lat: -4.4419, lng: 15.2663, value: 7 },
{ name: "Djibouti", lat: 11.8251, lng: 42.5903, value: 5 },
{ name: "Asmara", lat: 15.3229, lng: 38.9251, value: 5 },
{ name: "Juba", lat: 4.8594, lng: 31.5713, value: 5 },
{ name: "Sana'a", lat: 15.3694, lng: 44.1910, value: 6 },
{ name: "Kabul", lat: 34.5553, lng: 69.2075, value: 6 },
{ name: "Tashkent", lat: 41.2995, lng: 69.2401, value: 7 },
{ name: "Bishkek", lat: 42.8746, lng: 74.5698, value: 5 },
{ name: "Dushanbe", lat: 38.5358, lng: 68.7791, value: 5 },
{ name: "Ashgabat", lat: 37.9601, lng: 58.3261, value: 5 },
{ name: "Almaty", lat: 43.2220, lng: 76.8512, value: 6 },
{ name: "Nur-Sultan", lat: 51.1694, lng: 71.4491, value: 6 },
{ name: "Baku", lat: 40.4093, lng: 49.8671, value: 6 },
{ name: "Yerevan", lat: 40.1792, lng: 44.4991, value: 5 },
{ name: "Tbilisi", lat: 41.7151, lng: 44.8271, value: 5 },
{ name: "Ulaanbaatar", lat: 47.8864, lng: 106.9057, value: 6 },
{ name: "Pyongyang", lat: 39.0392, lng: 125.7625, value: 6 },
{ name: "Vientiane", lat: 17.9757, lng: 102.6331, value: 5 },
{ name: "Bandar Seri Begawan", lat: 4.9031, lng: 114.9398, value: 4 },
{ name: "Thimphu", lat: 27.4728, lng: 89.6390, value: 4 },
{ name: "Male", lat: 4.1755, lng: 73.5093, value: 4 },
{ name: "Macau", lat: 22.1987, lng: 113.5439, value: 6 },
{ name: "Quezon City", lat: 14.6760, lng: 121.0437, value: 7 },
{ name: "Cebu City", lat: 10.3157, lng: 123.8854, value: 6 },
{ name: "Davao City", lat: 7.1907, lng: 125.4553, value: 6 },
{ name: "Changsha", lat: 28.2282, lng: 112.9388, value: 7 },
{ name: "Dalian", lat: 38.9140, lng: 121.6147, value: 7 },
{ name: "Qingdao", lat: 36.0671, lng: 120.3826, value: 7 },
{ name: "Shenyang", lat: 41.8057, lng: 123.4315, value: 7 }

    ];
    
    // Convert lat/lng to 3D coordinates
    const latLngToVector3 = (lat, lng) => {
      const latRad = (90 - lat) * (Math.PI / 180);
      const lngRad = (180 + lng) * (Math.PI / 180);
      
      const x = 100 * Math.sin(latRad) * Math.cos(lngRad);
      const y = 100 * Math.cos(latRad);
      const z = 100 * Math.sin(latRad) * Math.sin(lngRad);
      
      return new THREE.Vector3(x, y, z);
    };
    
    // Add data points
    const pointsGroup = new THREE.Group();
    globe.add(pointsGroup);
    
    locations.forEach(loc => {
      const position = latLngToVector3(loc.lat, loc.lng);
      
      // Create a point with GitHub's color scheme
      const pointGeometry = new THREE.SphereGeometry(Math.max(0.8, loc.value / 12), 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x58a6ff, // GitHub blue
        transparent: true,
        opacity: 0.9,
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      
      // Add subtle glow effect
      const glowSize = Math.max(1.2, loc.value / 10);
      const haloGeometry = new THREE.SphereGeometry(glowSize, 16, 16);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x58a6ff, // GitHub blue
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      
      point.add(halo);
      point.position.copy(position);
      point.userData = { name: loc.name, position: position.clone() };
      pointsGroup.add(point);
    });
    
    // Create animation lines - Multiple active lines
    const createAnimationLines = () => {
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x58a6ff, // GitHub blue (changed from green)
        transparent: true,
        opacity: 0.4 
      });
      
      const lines = [];
      
      // Create more possible line connections
      for (let i = 0; i < pointsGroup.children.length; i++) {
        for (let j = i + 1; j < pointsGroup.children.length; j++) {
          // Increased probability of connection to create more lines
          if (Math.random() > 0.4) {
            const start = pointsGroup.children[i].position;
            const end = pointsGroup.children[j].position;
            
            // Create a curved line
            const lineGeometry = new THREE.BufferGeometry();
            
            // Get the midpoint and move it out from the center
            const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
            midPoint.normalize().multiplyScalar(120); // Curve outward
            
            // Create smooth curve
            const curve = new THREE.QuadraticBezierCurve3(
              start,
              midPoint,
              end
            );
            
            // Sample points along the curve
            const points = curve.getPoints(20);
            const vertices = [];
            
            points.forEach(point => {
              vertices.push(point.x, point.y, point.z);
            });
            
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const line = new THREE.Line(lineGeometry, lineMaterial.clone());
            line.userData = {
              start: i,
              end: j,
              curve: curve,
              progress: 0,
              // Add random animation delay to stagger line animations
              delay: Math.random() * 3000,
              active: false,
              speed: 0.005 + Math.random() * 0.01 // Different speeds for different lines
            };
            
            // Initially hide the line
            line.visible = false;
            globe.add(line);
            lines.push(line);
          }
        }
      }
      
      return lines;
    };
    
    // Create travel animation
    const animationLines = createAnimationLines();
    
    // Create multiple travelers (changed to blue color)
    const createTravelers = (count) => {
      const travelers = [];
      for (let i = 0; i < count; i++) {
        const travelerGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const travelerMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x58a6ff, // GitHub blue (changed from green)
          transparent: true,
          opacity: 0.9
        });
        const traveler = new THREE.Mesh(travelerGeometry, travelerMaterial);
        traveler.visible = false;
        traveler.userData = {
          lineIndex: null,
          progress: 0
        };
        globe.add(traveler);
        travelers.push(traveler);
      }
      return travelers;
    };
    
    // Create 8 travelers for multiple concurrent animations
    const travelers = createTravelers(8);
    
    // Animation function for multiple travelers
    const animateTravel = () => {
      // Try to activate idle lines/travelers
      animationLines.forEach((line, lineIndex) => {
        if (!line.userData.active && Math.random() < 0.01) {
          // Find an available traveler
          const availableTravelerIndex = travelers.findIndex(t => t.userData.lineIndex === null);
          if (availableTravelerIndex >= 0) {
            line.userData.active = true;
            line.userData.progress = 0;
            line.visible = true;
            
            const traveler = travelers[availableTravelerIndex];
            traveler.visible = true;
            traveler.userData.lineIndex = lineIndex;
            traveler.userData.progress = 0;
          }
        }
      });
      
      // Update active travelers
      travelers.forEach(traveler => {
        if (traveler.userData.lineIndex !== null) {
          const line = animationLines[traveler.userData.lineIndex];
          
          // Update progress
          traveler.userData.progress += line.userData.speed;
          line.userData.progress = traveler.userData.progress;
          
          if (traveler.userData.progress >= 1) {
            // Reset when animation completes
            line.userData.active = false;
            line.visible = false;
            traveler.visible = false;
            traveler.userData.lineIndex = null;
          } else {
            // Update traveler position
            const point = line.userData.curve.getPointAt(traveler.userData.progress);
            traveler.position.copy(point);
          }
        }
      });
    };
    
    // Create subtle pulsing animation for points
    pointsGroup.children.forEach((point, index) => {
      point.userData.pulseSpeed = 0.008 + index * 0.001;
      point.userData.pulseOffset = Math.random() * Math.PI * 2;
    });
    
    const animatePoints = (time) => {
      pointsGroup.children.forEach(point => {
        const pulse = Math.sin(time * point.userData.pulseSpeed + point.userData.pulseOffset) * 0.15 + 0.85;
        point.scale.set(pulse, pulse, pulse);
        
        // Animate the halo with subtle pulse
        if (point.children[0]) {
          point.children[0].scale.set(1 + pulse * 0.2, 1 + pulse * 0.2, 1 + pulse * 0.2);
          point.children[0].material.opacity = 0.2 * pulse;
        }
      });
    };
    
    // Add more connection lines (GitHub style)
    const createGlobalConnections = () => {
      // Increased number of connections
      const connectionsCount = 30;
      const connections = new THREE.Group();
      const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x58a6ff, // GitHub blue
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      
      for (let i = 0; i < connectionsCount; i++) {
        // Create two random points on the globe surface
        const point1 = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(100);
        
        const point2 = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(100);
        
        // Create midpoint for curve
        const midPoint = new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5);
        midPoint.normalize().multiplyScalar(120);
        
        // Create curved path
        const curve = new THREE.QuadraticBezierCurve3(point1, midPoint, point2);
        const points = curve.getPoints(20);
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, connectionMaterial.clone());
        
        line.userData = {
          animationProgress: Math.random(),
          animationSpeed: 0.003 + Math.random() * 0.002,
          maxOpacity: 0.1 + Math.random() * 0.1
        };
        
        connections.add(line);
      }
      
      globe.add(connections);
      return connections;
    };
    
    const globalConnections = createGlobalConnections();
    
    // Animate global connections with GitHub-like subtlety
    const animateGlobalConnections = (time) => {
      globalConnections.children.forEach(line => {
        const { animationProgress, animationSpeed, maxOpacity } = line.userData;
        
        // Update animation progress
        line.userData.animationProgress = (animationProgress + animationSpeed) % 1;
        
        // Pulse opacity
        const opacityPulse = Math.sin(time * 0.3 + line.userData.animationProgress * Math.PI * 2) * 0.5 + 0.5;
        line.material.opacity = opacityPulse * maxOpacity;
      });
    };
    
    // Handle mouse events for interactivity
    const onMouseDown = (event) => {
      isDraggingRef.current = true;
      const rect = containerRef.current.getBoundingClientRect();
      previousMousePositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      // Change cursor style
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
    };
    
    const onMouseMove = (event) => {
      if (!isDraggingRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mousePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      const deltaMove = {
        x: mousePosition.x - previousMousePositionRef.current.x,
        y: mousePosition.y - previousMousePositionRef.current.y
      };
      
      const rotationSpeed = 0.01;
      
      globe.rotation.y += deltaMove.x * rotationSpeed;
      globe.rotation.x += deltaMove.y * rotationSpeed;
      
      previousMousePositionRef.current = mousePosition;
    };
    
    const onMouseUp = () => {
      isDraggingRef.current = false;
      
      // Restore cursor
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }
    };
    
    // Add event listeners
    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('mouseleave', onMouseUp);
    
    // Add touch events for mobile
    const onTouchStart = (event) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        const rect = containerRef.current.getBoundingClientRect();
        previousMousePositionRef.current = {
          x: event.touches[0].clientX - rect.left,
          y: event.touches[0].clientY - rect.top
        };
      }
    };
    
    const onTouchMove = (event) => {
      if (!isDraggingRef.current || event.touches.length !== 1) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const touchPosition = {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
      };
      
      const deltaMove = {
        x: touchPosition.x - previousMousePositionRef.current.x,
        y: touchPosition.y - previousMousePositionRef.current.y
      };
      
      const rotationSpeed = 0.01;
      
      globe.rotation.y += deltaMove.x * rotationSpeed;
      globe.rotation.x += deltaMove.y * rotationSpeed;
      
      previousMousePositionRef.current = touchPosition;
    };
    
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };
    
    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchmove', onTouchMove);
    domElement.addEventListener('touchend', onTouchEnd);
    
    // Animation loop
    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Self-rotation - slower and more subtle like GitHub's globe
      if (!isDraggingRef.current) {
        globe.rotation.y += 0.0005;
      }
      
      // Update animations
      time += 0.01;
      animatePoints(time);
      animateGlobalConnections(time);
      
      // Animated travel for multiple lines
      animateTravel();
      
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoading(false);
    
    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const size = containerRef.current.offsetWidth;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
      
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('mousemove', onMouseMove);
      domElement.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('mouseleave', onMouseUp);
      
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchmove', onTouchMove);
      domElement.removeEventListener('touchend', onTouchEnd);
    };
  }, []);
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        ref={containerRef} 
        className="w-full aspect-square relative cursor-grab"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubGlobe;