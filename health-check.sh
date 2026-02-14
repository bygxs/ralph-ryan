#!/bin/bash

# Health check script for Docker container
echo "🔍 Checking if login form app is healthy..."

# Check if container is running
if ! docker ps | grep -q "login-form-container"; then
    echo "❌ Container is not running"
    exit 1
fi

# Check if nginx is responding
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8090 | grep -q "200"; then
    echo "✅ App is responding with HTTP 200"
else
    echo "❌ App is not responding properly"
    exit 1
fi

# Check if the React app bundle is loaded
if curl -s http://localhost:8090 | grep -q "bundle.js"; then
    echo "✅ React app bundle is being loaded"
else
    echo "❌ React app bundle not found in HTML"
    exit 1
fi

echo "🎉 All health checks passed! The app is running correctly."
echo "🌐 Access your login form at: http://localhost:8090"