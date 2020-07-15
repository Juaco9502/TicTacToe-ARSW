package edu.escuelaing.arsw.tictactoe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "package edu.escuelaing.arsw.tictactoe.endpoints")
public class TictactoeReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(TictactoeReactApplication.class, args);
	}

}
