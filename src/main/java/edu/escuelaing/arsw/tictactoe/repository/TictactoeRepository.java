package edu.escuelaing.arsw.tictactoe.repository;

import edu.escuelaing.arsw.tictactoe.model.Tictactoe;
import org.springframework.data.mongodb.repository.MongoRepository;
/**
 *
 * @author Juaco
 */
public interface TictactoeRepository extends MongoRepository<Tictactoe, String>{
    
}
