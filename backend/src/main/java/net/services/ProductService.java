package net.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.model.Product;
import net.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @SuppressWarnings("null")
    public Product getProduct(Long productId) {
        return productRepository.findById(productId).get();
    }

}
