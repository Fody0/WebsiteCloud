package Kara.CloudCom.pdf;

import Kara.CloudCom.services.Services;
import Kara.CloudCom.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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

    @Getter
    @Setter
    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @ManyToOne
    @Setter
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne
    @Setter
    @JoinColumn(name = "service_id")
    @JsonBackReference
    private Services services;
}
