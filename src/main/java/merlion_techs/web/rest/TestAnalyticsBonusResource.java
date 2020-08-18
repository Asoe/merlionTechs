package merlion_techs.web.rest;

import merlion_techs.domain.Permissions;
import merlion_techs.domain.Product;
import merlion_techs.domain.enumeration.Perms;
import merlion_techs.repository.PermissionsRepository;
import merlion_techs.repository.ProductRepository;
import merlion_techs.repository.UserWithPermsRepository;
import merlion_techs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link merlion_techs.domain.Product}.
 */
@RestController
@RequestMapping("/api/testAnalyticsBonus")
@Transactional
public class TestAnalyticsBonusResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    private static final String ENTITY_NAME = "product";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    @Autowired
    private  ProductRepository productRepository;
    
    @Autowired
    private  PermissionsRepository permissionsRepository;

    /**
     * {@code POST  /products} : Create a new product.
     *
     * @param product the product to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new product, or with status {@code 400 (Bad Request)} if the product has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product,@RequestHeader("id-user") Long user) throws URISyntaxException {
        
    	if(permissionsRepository.findAll().stream()
    			.filter(p->p.getPerm()==Perms.TO_PRODUCT_CREATE_AND_UPDATE)
    			.filter(p->p.getUserWithPerms()!=null &&p.getUserWithPerms().getUser().equals(user))
    			.count()>0)
    	{
    		log.debug("REST request to save Product : {}", product);
            if (product.getId() != null) {
                throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
            }
            Product result = productRepository.save(product);
            return ResponseEntity.created(new URI("/api/products/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    		
    	}  		
    	else {
    		log.debug("FAILED REST request to save Product. Permission denied");
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission denied for this user");    		
    	}
    	
    	
    }

    /**
     * {@code PUT  /products} : Updates an existing product.
     *
     * @param product the product to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated product,
     * or with status {@code 400 (Bad Request)} if the product is not valid,
     * or with status {@code 500 (Internal Server Error)} if the product couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/products")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product,@RequestHeader("id-user") Long user) throws URISyntaxException {
        
    	if(permissionsRepository.findAll().stream()
    			.filter(p->p.getPerm()==Perms.TO_PRODUCT_CREATE_AND_UPDATE)
    			.filter(p->p.getUserWithPerms()!=null &&p.getUserWithPerms().getUser().equals(user))
    			.count()>0)
    	{
    		log.debug("REST request to update Product : {}", product);
            if (product.getId() == null) {
                throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
            }
            Product result = productRepository.save(product);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, product.getId().toString()))
                .body(result);
    		
    	}  		
    	else {
    		log.debug("FAILED REST request to update Product. Permission denied");
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission denied for this user");    		
    	}
    	
    	
    }

    /**
     * {@code GET  /products} : get all the products.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of products in body.
     */
    @GetMapping("/products")
    public List<Product> getAllProducts(@RequestHeader("id-user") Long user) {	
    	
    	
    	if(permissionsRepository.findAll().stream()
    			.filter(p->p.getPerm()==Perms.TO_SHOW_PRODUCT_LIST)
    			.filter(p->p.getUserWithPerms()!=null &&p.getUserWithPerms().getUser().equals(user))
    			.count()>0)
    	{
    		log.debug("REST request to get all Products");
            return productRepository.findAll();
    		
    	}  		
    	else {
    		log.debug("FAILED REST request to get all Products. Permission denied");
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission denied for this user");    		
    	}
    	
        
    }

    /**
     * {@code GET  /products/:id} : get the "id" product.
     *
     * @param id the id of the product to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the product, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id,@RequestHeader("id-user") Long user) {
    	
    	if(permissionsRepository.findAll().stream()
    			.filter(p->p.getPerm()==Perms.TO_PRODUCT_DETAIL)
    			.filter(p->p.getUserWithPerms()!=null &&p.getUserWithPerms().getUser().equals(user))
    			.count()>0)
    	{
    		log.debug("REST request to get Product : {}", id);
            Optional<Product> product = productRepository.findById(id);
            return ResponseUtil.wrapOrNotFound(product);
    		
    	}  		
    	else {
    		log.debug("FAILED REST request to get Product. Permission denied");
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission denied for this user");    		
    	}
    	
        
    }

    /**
     * {@code DELETE  /products/:id} : delete the "id" product.
     *
     * @param id the id of the product to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
    	log.debug("REST request to delete Product : {}", id);
    	productRepository.deleteById(id);
    	return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    
    }
}
