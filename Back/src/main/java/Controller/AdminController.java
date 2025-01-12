package Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Service.AdminService;
import DTO.LoginRequest;
import DTO.RegisterRequest;
import Model.Admin;
import Security.JWTUtil;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private JWTUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Recebendo login com email: " + loginRequest.getEmail());
        
        String token = adminService.autenticarAdmin(loginRequest.getEmail(), loginRequest.getSenha());
        
        return ResponseEntity.ok().body(token);
    }
}