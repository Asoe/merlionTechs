package merlion_techs.web.rest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import merlion_techs.domain.Product;
import merlion_techs.domain.Sales;
import merlion_techs.domain.enumeration.State;
import merlion_techs.repository.SalesRepository;

@RestController
@RequestMapping("/api/metric")
@Transactional
public class MetricResource {
	
	private final Logger log = LoggerFactory.getLogger(SalesResource.class);

   
    
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    @Autowired
    private  SalesRepository salesRepository;
    
    @GetMapping("/salesDeliveredForDay")
    public List<SalesOnDay> getSalesDeliveredOnDay() {
    	Map<LocalDate,Integer> salesDeliveredOnDay= new HashMap<LocalDate,Integer>();
        log.debug("REST request to get all Sales delivered for day");
        List<Sales> sales= salesRepository.findAll();
        
        sales.forEach((sale)->{
        	if(sale.getState()==State.DELIVERED) {
				LocalDate key=sale.getDate();
				if(key!=null && sale.getProduct()!=null){
					if(salesDeliveredOnDay.containsKey(key)) {
						salesDeliveredOnDay.put(key, salesDeliveredOnDay.get(key)+1);
					}else {
						salesDeliveredOnDay.put(key, 1);
					}
				}
        	}
        });
        List<SalesOnDay> listSalesDeliveredOnDay= new ArrayList<SalesOnDay>();
        salesDeliveredOnDay.forEach((date,i)->listSalesDeliveredOnDay.add(new SalesOnDay(date,i)));        
        return listSalesDeliveredOnDay;
    }
    
    @GetMapping("/salesForDay")
    public List<SalesOnDay> getSalesOnDay() {
    	Map<LocalDate,Integer> salesOnDay= new HashMap<LocalDate,Integer>();
        log.debug("REST request to get all Sales for day");
        List<Sales> sales= salesRepository.findAll();
        
        sales.forEach((sale)->{        	
			LocalDate key=sale.getDate();
			if(key!=null&&sale.getProduct()!=null){
				if(salesOnDay.containsKey(key)) {
					salesOnDay.put(key, salesOnDay.get(key)+1);    			
				}else {
					salesOnDay.put(key, 1);
				}
			}   		     		
        	
		});
		List<SalesOnDay> listSalesOnDay= new ArrayList<SalesOnDay>();
        salesOnDay.forEach((date,i)->listSalesOnDay.add(new SalesOnDay(date,i)));   
        return listSalesOnDay;
    }
    
    
    @GetMapping("/topProductSales")
    public List<ProductMetric> getTopFiveProductSales() {
    	
    	Map<Product,Integer> productTotalSales = new HashMap<Product, Integer>();
    	
    	salesRepository.findAll().forEach((sale)->{
			Product key=sale.getProduct();
			if(key!=null){
				if(productTotalSales.containsKey(key)) {
					productTotalSales.put(key, productTotalSales.get(key)+1);    			
				}
				else {
					productTotalSales.put(key,1);    			
				}
			}    		
    	});     	
    	
    	List<ProductMetric> listTopFiveProductSales= new ArrayList<ProductMetric>();
    	
    	productTotalSales.forEach((product,totalSales)->{
    		listTopFiveProductSales.add(new ProductMetric(product,totalSales));
    	});
    	
    	listTopFiveProductSales.sort(Collections.reverseOrder((p1, p2) ->p1.getCantTotalSales().compareTo(p2.getCantTotalSales())));
    	if(listTopFiveProductSales.size()>=5) {
    		return listTopFiveProductSales.subList(0, 5);
    	}else {
    		return listTopFiveProductSales;
    	}
    	
    	
	}
	

	@GetMapping("/topProductProfits")
    public List<ProductMetric> getTopProductProfits() {
    	
		Map<Product,BigDecimal> productTotalPrice = new HashMap<Product, BigDecimal>();
    	salesRepository.findAll().forEach((sale)->{
			Product key=sale.getProduct();
			if(key!=null){
				if(productTotalPrice.containsKey(key)) {    			
					productTotalPrice.put(key,productTotalPrice.get(key).add(key.getPrice()));
				}
				else {    			
					productTotalPrice.put(key, key.getPrice());
				}
			}    		
    	}); 
    	
    	List<ProductMetric> listTopFiveProductSales= new ArrayList<ProductMetric>();
    	
    	productTotalPrice.forEach((product,totalPrice)->{
    		listTopFiveProductSales.add(new ProductMetric(product,totalPrice));
    	});    	
		listTopFiveProductSales.sort(Collections.reverseOrder((p1, p2) ->p1.getTotalPrice().compareTo(p2.getTotalPrice())));

    	if(listTopFiveProductSales.size()>=5) {
    		return listTopFiveProductSales.subList(0, 5);
    	}else {
    		return listTopFiveProductSales;
    	}
    	
    	
    }
    
    
    
    class ProductMetric{
    	private Product product;
    	private Integer cantTotalSales;
    	private BigDecimal totalPrice;

		public Product getProduct() {
			return product;
		}
				
		public void setProduct(Product product) {
			this.product = product;
		}
		public ProductMetric(Product product, Integer cantTotalSales) {
			
			this.product = product;
			this.cantTotalSales = cantTotalSales;
		}

		public ProductMetric(Product product, BigDecimal totalPrice) {
			
			this.product = product;
			this.totalPrice = totalPrice;
		}
		public Integer getCantTotalSales() {
			return cantTotalSales;
		}
		public void setCantTotalSales(Integer cantTotalSales) {
			this.cantTotalSales = cantTotalSales;
		}
		public BigDecimal getTotalPrice() {
			return totalPrice;
		}
		public void setTotalPrice(BigDecimal totalPrice) {
			this.totalPrice = totalPrice;
		}
		
    	
    	
    }
    
    class SalesOnDay{
    	private LocalDate date;
    	private Integer sales;
    	
    	public SalesOnDay(){}

    	
		public SalesOnDay(LocalDate date, Integer sales) {
			
			this.date = date;
			this.sales = sales;
		}


		public LocalDate getDate() {
			return date;
		}

		public void setDate(LocalDate date) {
			this.date = date;
		}

		public Integer getSales() {
			return sales;
		}

		public void setSales(Integer sales) {
			this.sales = sales;
		};
    	
    	
    }

}
