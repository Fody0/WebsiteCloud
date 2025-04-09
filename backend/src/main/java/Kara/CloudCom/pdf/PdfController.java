package Kara.CloudCom.pdf;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/pdfs")
public class PdfController {

    private final PdfStorageService pdfStorageService;

    public PdfController(PdfStorageService pdfStorageService) {
        this.pdfStorageService = pdfStorageService;
    }

    @PostMapping
    public ResponseEntity<byte[]> createPdf(@RequestBody Map<String, Object> dynamicData) throws IOException {
        PdfDocument pdf = pdfStorageService.storePdf(dynamicData);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdf.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.getData());
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getPdf(@PathVariable Long id) {
        PdfDocument pdf = pdfStorageService.getPdf(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdf.getFileName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf.getData());
    }
}
