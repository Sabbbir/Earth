// src/shaders/ozoneFragment.glsl

varying vec3 vNormal;

// Declare uniforms for strength and threshold
uniform float strength;
uniform float threshold;

void main() {
    // Calculate the intensity based on the angle between the normal and the view direction
    float intensity = pow(strength - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);

    // Apply threshold to control the glow effect
    if (intensity < threshold) {
        discard; // Discard fragments below the threshold
    }

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * intensity; // Whitish color with intensity
}

