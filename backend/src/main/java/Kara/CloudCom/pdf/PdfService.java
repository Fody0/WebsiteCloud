package Kara.CloudCom.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class PdfService {
    public byte[] generatePdf(Map<String, Object> dynamicData) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);


            // Загрузка шрифта из ресурсов
            InputStream fontStream = getClass().getClassLoader().getResourceAsStream("fonts/Arial.ttf");            PDType0Font font = PDType0Font.load(document, fontStream);

            float startX = 250;
            float startY = 700;
            float lineHeight = 15;

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {

                String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));

                // Data_Position
                contentStream.beginText();
                contentStream.setFont(font, 12);
                contentStream.newLineAtOffset(500, 750);
                contentStream.showText("Дата: " + currentDate);
                contentStream.endText();

                // Текущая позиция Y
                float currentY = startY;
                float currentX = startX-150;

                var service = dynamicData.remove("service_name");

                contentStream.beginText();
                contentStream.setFont(font, 16);
                contentStream.newLineAtOffset(startX, currentY);
                contentStream.showText(service.toString());
                contentStream.endText();
                contentStream.setFont(font, 12);

                currentY -= 50;

                for (Map.Entry<String, Object> entry : dynamicData.entrySet()) {

                    String text = entry.getKey() + ": " + entry.getValue().toString();

                    contentStream.beginText();
                    contentStream.newLineAtOffset(currentX, currentY);
                    contentStream.showText(text);
                    contentStream.endText();

                    currentY -= lineHeight;

                }
            }

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
    }

}
