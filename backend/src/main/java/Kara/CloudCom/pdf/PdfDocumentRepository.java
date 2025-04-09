package Kara.CloudCom.pdf;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PdfDocumentRepository extends JpaRepository<PdfDocument, Long> {
}