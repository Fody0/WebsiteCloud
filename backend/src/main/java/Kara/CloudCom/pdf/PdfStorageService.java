package Kara.CloudCom.pdf;

import Kara.CloudCom.auth.UserDataRepository;
import Kara.CloudCom.config.JwtService;
import Kara.CloudCom.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class PdfStorageService {

    private final PdfDocumentRepository repository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PdfService pdfService;

    public PdfStorageService(PdfDocumentRepository repository, PdfService pdfService,
                             UserRepository user_repository,
                             JwtService jwt_service) {
        this.repository = repository;
        this.pdfService = pdfService;
        this.userRepository = user_repository;
        this.jwtService = jwt_service;
    }

    public PdfDocument storePdf(Map<String, Object> dynamicData, HttpServletRequest httpRequest) throws IOException {
        byte[] pdfData = pdfService.generatePdf(dynamicData);
        var fileName = UUID.randomUUID().toString() + ".pdf";

        PdfDocument pdfDocument = new PdfDocument();
        pdfDocument.setFileName(fileName);
        pdfDocument.setContentType("application/pdf");
        pdfDocument.setData(pdfData);


        final String authHeader = httpRequest.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;
        jwtToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtToken);
        var user = userRepository.findByEmail(userEmail).orElseThrow();
        pdfDocument.setUser(user);

        return repository.save(pdfDocument);
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
