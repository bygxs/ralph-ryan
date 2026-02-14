# Docker Setup for Login Form App

This project includes comprehensive Docker support for development, testing, and production deployment.

## Quick Start

### Production Build & Run
```bash
# Build the production image
docker build -t login-form-app .

# Run the production container
docker run -p 8080:80 login-form-app
```

### Using Docker Compose (Recommended)
```bash
# Development with hot reload
docker-compose up dev

# Production build
docker-compose up prod

# Run tests
docker-compose run test

# Type checking
docker-compose run typecheck
```

## Available Commands

### NPM Scripts
```bash
# Docker operations
pnpm docker:build          # Build production image
pnpm docker:run            # Run production container
pnpm docker:dev            # Start development environment
pnpm docker:prod           # Start production environment
pnpm docker:test           # Run tests in Docker
pnpm docker:typecheck      # Run type checking in Docker
```

### Docker Compose Services

#### Development (`docker-compose up dev`)
- **Port**: 3000
- **Features**: Hot reload, volume mounting for live code changes
- **Use**: Active development with instant feedback

#### Production (`docker-compose up prod`)
- **Port**: 8080
- **Features**: Optimized nginx serving, security headers
- **Use**: Testing production build locally

#### Testing (`docker-compose run test`)
- **Features**: Isolated test environment
- **Use**: Running tests in consistent environment

## Docker Images

### Production Image (`Dockerfile`)
- **Base**: `node:18-alpine` (build stage) → `nginx:alpine` (runtime)
- **Size**: ~50MB (optimized multi-stage build)
- **Features**: 
  - Static file serving via nginx
  - Security headers
  - SPA routing support
  - Asset caching

### Development Image (`Dockerfile.dev`)
- **Base**: `node:18-alpine`
- **Features**:
  - Development server with hot reload
  - Volume mounting for live code changes
  - All development dependencies

## Configuration

### Environment Variables
- `NODE_ENV`: Set automatically (development/production/test)
- `PORT`: 3000 (dev), 80 (prod)

### Volumes (Development Only)
- Source code mounted at `/app`
- `node_modules` isolated to prevent conflicts

## Building Custom Images

### Development with Custom Ports
```bash
docker build -f Dockerfile.dev -t login-form-dev .
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules login-form-dev
```

### Production with Custom Configuration
```bash
docker build -t login-form-prod .
docker run -p 8081:80 -e NGINX_WORKER_PROCESSES=2 login-form-prod
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Use different port
docker-compose up -p 3001:3000 dev
```

### Build Issues
```bash
# Clean build cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Permission Issues
```bash
# Run with current user ID
docker-compose -f docker-compose.yml -f docker-compose.override.yml up dev
```

## Production Deployment

### Basic Deployment
```bash
# Build and tag for registry
docker build -t your-registry/login-form-app:latest .
docker push your-registry/login-form-app:latest

# Deploy on server
docker pull your-registry/login-form-app:latest
docker run -d -p 80:80 --name login-form your-registry/login-form-app:latest
```

### With Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml login-form-stack
```

### Kubernetes Deployment
See `k8s/` directory for Kubernetes manifests (if available).

## Performance Optimization

### Multi-stage Build Benefits
- **Smaller image size**: Only production assets in final image
- **Faster deployment**: Less data to transfer
- **Better security**: Fewer dependencies in runtime

### Nginx Configuration
- Static asset caching (1 year)
- Gzip compression
- Security headers
- SPA routing support

## Security Considerations

- Non-root user in production (nginx runs as nginx user)
- Security headers configured
- Minimal attack surface with alpine images
- No source code in production image

## Monitoring

### Health Checks
The nginx configuration includes basic health monitoring. For production, consider adding:
- Application-level health endpoints
- Log aggregation
- Performance monitoring

### Logs
```bash
# View container logs
docker logs <container-name>

# Follow logs in real-time
docker logs -f <container-name>
```