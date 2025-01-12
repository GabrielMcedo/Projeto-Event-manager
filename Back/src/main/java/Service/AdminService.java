package Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import Model.Admin;
import Repository.AdminRepository;
import Security.JWTUtil; 

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;

    public Admin cadastrarAdmin(String nome, String email, String senha) {
        if (adminRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Administrador já cadastrado.");
        }

        Admin admin = new Admin();
        admin.setNome(nome);
        admin.setEmail(email);
        admin.setSenha(passwordEncoder.encode(senha));

        return adminRepository.save(admin);
    }

    public String autenticarAdmin(String email, String senha) {
        System.out.println("Tentando autenticar o admin com o email: " + email);

        Admin admin = adminRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));

        if (!passwordEncoder.matches(senha, admin.getSenha())) {
            System.out.println("Senha incorreta para o admin com email: " + email);
            throw new RuntimeException("Senha incorreta.");
        }
        
        String token = jwtUtil.generateToken(admin.getEmail());

        System.out.println("Admin autenticado com sucesso: " + admin.getEmail());
        return token;
    }
}
