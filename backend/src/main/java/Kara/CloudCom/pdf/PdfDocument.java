package Kara.CloudCom.pdf;

import Kara.CloudCom.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "_pdf_document")
public class PdfDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String fileName;
    @Setter
    private String contentType;

    @Getter
    @Setter
    @Lob
    private byte[] data;

    @ManyToOne
    @Setter
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

//
//    public void setFileName(String fileName) {}
//    public void setData(byte[] data) {}
//    public void setContentType(String contentType) {}
}
