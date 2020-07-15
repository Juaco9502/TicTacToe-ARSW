package edu.escuelaing.arsw.tictactoe.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Juaco
 */
@Document(collection = "tictactoes")
public class Tictactoe {
    @Id
    private String id;
    private List<String> movements;

    public Tictactoe() {
    }

    public Tictactoe(String id, List<String> movements) {
        this.id = id;
        this.movements = movements;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getMovements() {
        return movements;
    }

    public void setMovements(List<String> movements) {
        this.movements = movements;
    }

    @Override
    public String toString() {
        return "Tictactoe{" + "id=" + id + ", movements=" + movements + '}';
    }
    
}
