package Kara.CloudCom.pdf;

import Kara.CloudCom.config.JwtService;
import Kara.CloudCom.services.Services;
import Kara.CloudCom.services.ServicesRepository;
import Kara.CloudCom.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;

@Service
public class PdfStorageService {

    private final PdfDocumentRepository repository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PdfService pdfService;
    private final ServicesRepository servicesRepository;

    public PdfStorageService(PdfDocumentRepository repository, PdfService pdfService,
                             UserRepository user_repository,
                             JwtService jwt_service, ServicesRepository servicesRepository) {
        this.repository = repository;
        this.pdfService = pdfService;
        this.userRepository = user_repository;
        this.jwtService = jwt_service;
        this.servicesRepository = servicesRepository;
    }

    public PdfDocument storePdf(Map<String, Object> dynamicData, HttpServletRequest httpRequest) throws IOException {

        String serviceName = (String) dynamicData.get("service_name");
        if (serviceName == null) {
            throw new IllegalArgumentException("Service name is required");
        }
        Services service = servicesRepository.findByName(serviceName)
                .orElseThrow(() -> new RuntimeException("Service not found: " + serviceName));



        byte[] pdfData = pdfService.generatePdf(dynamicData);
//        String fileName = generateFileName(user);
//
//        var fileName = UUID.randomUUID().toString() + ".pdf";
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//        String fileName = dynamicData.get("name").toString() + "-" +
//                dynamicData.get("surname").toString() + "-" +
//                dynamicData.get("service_name") + "-" + ".pdf";
//

        String fileName = dynamicData.get("Имя").toString() + "-" + dynamicData.get("Фамилия") + "-" +
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm"))+
                ".pdf";


        PdfDocument pdfDocument = new PdfDocument();
        pdfDocument.setCreationDate(LocalDateTime.now());//data
        pdfDocument.setFileName(fileName);
        pdfDocument.setContentType("application/pdf");
        pdfDocument.setData(pdfData);
        pdfDocument.setServices(service);


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

        String serviceName = (String) dynamicData.get("service_name");
        if (serviceName == null) {
            throw new IllegalArgumentException("Service name is required");
        }
        Services service = servicesRepository.findByName(serviceName)
                .orElseThrow(() -> new RuntimeException("Service not found: " + serviceName));



        byte[] pdfData = pdfService.generatePdf(dynamicData);
//        var fileName = UUID.randomUUID().toString() + ".pdf";
        String fileName = dynamicData.get("Имя").toString() + "-" + dynamicData.get("Фамилия") + "-" +
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm"))+
                ".pdf";



        PdfDocument pdfDocument = new PdfDocument();
        pdfDocument.setCreationDate(LocalDateTime.now());//data
        pdfDocument.setFileName(fileName);
        pdfDocument.setContentType("application/pdf");
        pdfDocument.setData(pdfData);
        pdfDocument.setServices(service);

        return repository.save(pdfDocument);
    }

    public PdfDocument getPdf(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("PDF not found"));
    }

}
