document.addEventListener('DOMContentLoaded', () => {
    const fileBox = document.querySelector('.file-box.amex');
    let isDragging = false;

    const parseCSVLine = (line) => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current);
        
        return result.map(field => field.trim().replace(/^"|"$/g, ''));
    };

    const processFile = (file) => {
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
            alert("Bitte nur CSV-Dateien hochladen.");
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = e.target?.result;
            if (!text) {
                alert("Fehler beim Lesen der Datei: Leere Datei");
                return;
            }

            try {
                const lines = text.split("\n");
                if (lines.length < 2) {
                    alert("Die CSV-Datei muss mindestens eine Kopfzeile und eine Datenzeile enthalten.");
                    return;
                }

                const processedLines = lines.map((line, index) => {
                    if (!line.trim()) return '';
                    
                    const columns = parseCSVLine(line);
                    
                    if (index === 0) {
                        return columns.map(col => `"${col}"`).join(',');
                    }
                    
                    if (columns.length < 3) return '';
                    
                    const processedColumns = columns.map((col, colIndex) => {
                        let value = col.replace(/"/g, '');
                        
                        if (colIndex === 0) {
                            value = value.replace(/\//g, ".");
                        } else if (colIndex === 2) {
                            if (value.includes(',')) {
                                const betrag = value.replace(",", ".");
                                if (!isNaN(Number(betrag))) {
                                    const neuerBetrag = -Number(betrag);
                                    value = neuerBetrag.toFixed(2).replace(".", ",");
                                }
                            }
                        }
                        
                        return `"${value}"`;
                    });
                    
                    return processedColumns.join(",");
                }).filter(line => line.trim());
                
                const processedCSV = processedLines.join("\n");
                
                const blob = new Blob([processedCSV], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `converted_${file.name}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error("Fehler bei der Verarbeitung:", error);
                alert("Fehler bei der Verarbeitung der Datei. Bitte überprüfen Sie das Format.");
            }
        };

        reader.onerror = () => {
            console.error("Fehler beim Lesen der Datei");
            alert("Fehler beim Lesen der Datei. Bitte versuchen Sie es erneut.");
        };

        reader.readAsText(file);
    };

    // Drag & Drop Events
    fileBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!isDragging) {
            isDragging = true;
            fileBox.classList.add('dragging');
            
            // Drag-Overlay erstellen, falls es noch nicht existiert
            if (!document.querySelector('.drag-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'drag-overlay';
                const message = document.createElement('div');
                message.className = 'drag-message';
                message.textContent = 'CSV-Datei hier ablegen';
                overlay.appendChild(message);
                fileBox.appendChild(overlay);
            }
        }
    });

    fileBox.addEventListener('dragleave', (e) => {
        e.preventDefault();
        isDragging = false;
        fileBox.classList.remove('dragging');
        const overlay = fileBox.querySelector('.drag-overlay');
        if (overlay) {
            overlay.remove();
        }
    });

    fileBox.addEventListener('drop', (e) => {
        e.preventDefault();
        isDragging = false;
        fileBox.classList.remove('dragging');
        const overlay = fileBox.querySelector('.drag-overlay');
        if (overlay) {
            overlay.remove();
        }

        const file = e.dataTransfer?.files[0];
        if (file) {
            processFile(file);
        }
    });

    // Click Event für Dateiauswahl
    fileBox.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.style.display = 'none';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (file) {
                processFile(file);
            }
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
});
