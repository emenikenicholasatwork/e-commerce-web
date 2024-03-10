package net.auth;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.components.RecentActivities;
import net.components.componentsRepository.RecentActivitiesRepository;
import net.config.JwtService;
import net.model.Role;
import net.model.ShoppingCart;
import net.model.User;
import net.repository.userRepository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final RecentActivitiesRepository recentActivitiesRepository;
        private final AuthenticationManager authenticationManager;

        public ResponseEntity<?> register(RegisterRequest request) {
                var checkedUser = userRepository.findByEmail(request.getEmail());
                if (checkedUser.isPresent()) {
                        return new ResponseEntity<>("account with email already axist", HttpStatus.FOUND);
                }
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .created(LocalDate.now())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .shoppingCart(new ShoppingCart())
                                .role(Role.USER)
                                .build();
                var jwtToken = jwtService.generateToken(user);
                userRepository.save(user);
                var recentActivity = RecentActivities.builder()
                                .time(LocalDate.now())
                                .activity(user.getName() + " Just created an account...")
                                .build();
                recentActivitiesRepository.save(recentActivity);

                var token = AuthenticationResponse.builder()
                                .token(jwtToken)
                                .build();
                return new ResponseEntity<>(token, HttpStatus.OK);
        }

        public ResponseEntity<?> authenticate(AuthenticationRequest request) {
                Optional<User> checkUser = userRepository.findByEmail(request.getEmail());
                if (!checkUser.isPresent()) {
                        return new ResponseEntity<>("", HttpStatus.FORBIDDEN);
                }
                if (passwordEncoder.matches(request.getPassword(), checkUser.get().getPassword())) {
                        var jwtToken = jwtService.generateToken(checkUser.get());
                        var token = AuthenticationResponse.builder()
                                        .token(jwtToken)
                                        .build();
                        return new ResponseEntity<>(token, HttpStatus.OK);
                } else {
                        return new ResponseEntity<>("", HttpStatus.UNAUTHORIZED);
                }
        }

}
