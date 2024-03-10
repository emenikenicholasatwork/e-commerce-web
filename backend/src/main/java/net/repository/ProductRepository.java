package net.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import net.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Product SET price = :newPrice WHERE id = :id")
    void changeCapPrice(Long id, double newPrice);

}
