package Kara.CloudCom.pdf;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class PdfStorageService {

    private final PdfDocumentRepository repository;
    private final PdfService pdfService;

    public PdfStorageService(PdfDocumentRepository repository, PdfService pdfService) {
        this.repository = repository;
        this.pdfService = pdfService;
    }

    public PdfDocument storePdf(Map<String, Object> dynamicData) throws IOException {
        byte[] pdfData = pdfService.generatePdf(dynamicData);
        var fileName = UUID.randomUUID().toString() + ".pdf";

        PdfDocument pdfDocument = new PdfDocument();
        pdfDocument.setFileName(fileName);
        pdfDocument.setContentType("application/pdf");
        pdfDocument.setData(pdfData);

        return repository.save(pdfDocument);
    }

    public PdfDocument getPdf(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("PDF not found"));
    }
}
