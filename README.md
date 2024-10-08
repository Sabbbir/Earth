# Earth Visualization with ISS Orbit

This project is a 3D interactive visualization of Earth and the International Space Station (ISS) orbit, built using [three.js](https://threejs.org/). The application allows users to manipulate the Earth's rotation, the star count, the ozone layer properties, and the ISS orbit parameters in real-time. The project demonstrates the use of WebGL and custom shaders to simulate realistic effects like Earth’s atmosphere, ozone layer, and stars.

## Features

- **Interactive Earth Model**: Control Earth's rotation speed and direction.
- **Realistic Atmosphere and Ozone Layer**: Simulate Earth’s atmosphere and ozone layer using custom shaders with adjustable properties.
- **Dynamic Star Background**: Adjust the number of stars rendered in the background.
- **ISS Orbit**: Visualize the International Space Station orbiting Earth, with real-time controls for orbit speed, radius, and scale.
- **User Interface**: An intuitive control panel for modifying the settings.

## Screenshots

*Figure 1: Start screen showing Earth with atmosphere and star background.*
![Screenshot of Start Screen](screenshot1.png)

*Figure 2: ISS orbiting Earth with control panel displayed.*
![Screenshot of ISS Orbit and other Controls](screenshot2.png)

## Installation and Setup

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/en/) (v14 or higher recommended).
- **Web Browser**: Modern browser with WebGL support (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge).

### Steps      

### Clone the repository
    git clone https://github.com/Sabbbir/Earth.git
    cd Earth

### Installation
    npm install

### Run locally!!
    npm run dev
 

## Access the application:

Once the server is running, navigate to the provided URL in your web browser to interact with the Earth Visualization app.

## Project Directory Structure

Here is the structure of the project showing the key files and directories:

```bash
.
├── index.html                       # Main HTML file
├── LICENSE                          # License file
├── node_modules/                    # Directory for Node.js dependencies (auto-installed)
├── package.json                     # Project dependencies and scripts
├── package-lock.json                # Lockfile for npm dependencies
├── public/                          # Public assets directory
│   ├── assets/                      # Sub-directory for visual assets
│   │   ├── earth.jpg                # Texture for Earth surface
│   │   ├── green_earth.jpg          # Alternative Earth texture
│   │   ├── satellites/              # Directory for 3D satellite models
│   │   └── sun.glb                  # 3D model of the Sun
├── src/                             # Source directory for project files
│   ├── main.js                      # Core JavaScript file for three.js setup
│   └── shaders/                     # Directory for custom shaders
│       ├── atmosphereFragment.glsl  # Fragment shader for atmosphere effect
│       ├── atmosphereVertex.glsl    # Vertex shader for atmosphere effect
│       ├── fragment.glsl            # Fragment shader for Earth
│       ├── ozoneFragment.glsl       # Fragment shader for ozone layer
│       └── ozoneVertex.glsl         # Vertex shader for ozone layer
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore file to exclude unnecessary files
  
```
## Usage

Once the application is running, you can interact with the following features from the control panel:

### Earth Rotation:
- **Rotation Speed Slider**: Adjust the rotation speed of Earth.
- **Reverse Rotation Button**: Toggle the rotation direction of Earth.
- **Auto Rotate Button**: Automatically rotate the camera around Earth.

### Star Count:
- **Star Count Slider**: Modify the number of stars displayed in the background.

### Ozone Layer:
- **Radius Slider**: Control the size of Earth's ozone layer.
- **Strength Slider**: Adjust the intensity of the ozone layer's glow.

### ISS Orbit:
- **Orbit Speed Slider**: Adjust the speed at which the ISS orbits Earth.
- **Orbit Radius Slider**: Change the distance of the ISS from Earth.
- **Scale Slider**: Modify the size of the ISS model.

## Controls Overview

| Control               | Description                                          |
|-----------------------|------------------------------------------------------|
| **Earth Rotation Speed**  | Slider to adjust the rotation speed of Earth.       |
| **Reverse Rotation**      | Button to toggle the direction of Earth's rotation. |
| **Auto Rotate**           | Button to automatically rotate the camera around Earth. |
| **Star Count**            | Slider to adjust the number of stars in the background. |
| **Ozone Radius**          | Slider to control the ozone layer's size.           |
| **Ozone Strength**        | Slider to adjust the intensity of the ozone layer.  |
| **ISS Orbit Speed**       | Slider to adjust the ISS orbit speed around Earth.  |
| **ISS Orbit Radius**      | Slider to adjust the ISS's distance from Earth.     |
| **ISS Scale**             | Slider to control the size of the ISS model.        |
-----------------------------------------------------------------------------------


## How to Contribute

If you'd like to contribute to this project, follow the steps below:

### 1. Fork the repository

Fork the project repository to your own GitHub account by clicking the "Fork" button at the top of the repository page.

### 2. Create your feature branch

Clone the repository to your local machine and create a new branch for your feature or fix:
   ```bash
    git checkout -b feature/YourFeature
```
### 3. Commit your changes
Make your changes, then commit them with a meaningful commit message:
   ```bash
    git commit -m 'Add YourFeature'
```

### 4. Push the changes
Push your changes to your forked repository:
   ```bash
    git push origin feature/YourFeature
```

### 5. Open a pull request
Once your changes are pushed, go to the original repository on GitHub and open a pull request. Make sure to include a clear description of what you’ve done and why.




## Acknowledgments

- [Three.js](https://threejs.org/) for providing the powerful 3D JavaScript library.
- [NASA Visible Earth](https://visibleearth.nasa.gov/) for Earth texture resources.
- Inspiration from other 3D Earth visualization projects.

## Reporting Issues

If you find any bugs or have feature requests, please open an issue on [GitHub Issues](https://github.com/Sabbbir/Earth/issues).

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Name**: Sabbir Ahmed
- **Email**: [sabbir.ahmed.cse19.just@gmail.com](mailto:sabbir.ahmed.cse19.just@gmail.com)
- **GitHub**: [Sabbbir](https://github.com/Sabbbir)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
