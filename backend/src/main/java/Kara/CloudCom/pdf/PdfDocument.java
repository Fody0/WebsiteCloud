package Kara.CloudCom.pdf;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
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

//
//    public void setFileName(String fileName) {}
//    public void setData(byte[] data) {}
//    public void setContentType(String contentType) {}
}
