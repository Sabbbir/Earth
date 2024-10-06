varying vec3 vertexNormal;


void main(){
    float intensity = pow(.5 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0  );
    gl_Position = vec4(.3, .6, 1.0, 1.0) * intensity;

}