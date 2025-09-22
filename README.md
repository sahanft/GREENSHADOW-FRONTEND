



# Getting Started


### Reference Documentation


For further reference, please consider the following sections:


* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)

* * [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/3.3.5/maven-plugin)

* * [Create an OCI image](https://docs.spring.io/spring-boot/3.3.5/maven-plugin/build-image.html)

* * [Spring Data JPA](https://docs.spring.io/spring-boot/3.3.5/reference/data/sql.html#data.sql.jpa-and-spring-data)

* * [Spring Web](https://docs.spring.io/spring-boot/3.3.5/reference/web/servlet.html)


### Guides


The following guides illustrate how to use some features concretely:


* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)

* [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)

* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)

* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)

* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)



### Maven Parent overrides


Due to Maven's design, elements are inherited from the parent POM to the project POM.

While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the

parent.


To prevent this, the project POM contains empty overrides for these elements.

If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.



### Project Description
### Purpose of the Project

This is a  system for managing agricultural and animal operations.
From the structure and files, it’s designed as a Farm System with JWT-based security.

### Key Features (based on controllers & entities)

### Authentication & Security

* AuthUserController, JWTConfigFilter, SequrityConfig

* Implements JWT login/authentication to secure APIs.

* Manages user roles (e.g., administrative, manager, scientist, staff).

### User & Staff Management

UserController, StaffController

Create, update, delete, and manage users and staff.

Staff roles (StaffRole.java) define different permissions/responsibilities.

### Field,planand animal Management

FieldController, AnimalController

Manage fields, assign animals and plants to fields.

Handle plants and animal data (planting, harvesting, etc.).

### Equipment & Vehicle Management

EquipmentController, VehicleController

Keep records of equipment and vehicles used in farming.

Likely tracks availability, maintenance, and assignments.

### Logs & Monitoring

LogController, HealthCheckController






























