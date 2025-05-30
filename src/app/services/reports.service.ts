import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class reportsService {
    private baseUrl = environment.apiUrl + '/reports/';

    constructor(private http: HttpClient) {}

    // Obtener lista de reportes
    obtenerReportes() {
        const token = localStorage.getItem('access');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(this.baseUrl, { headers });
    }

    // Crear nuevo reporte
    crearReporte(data: any) {
        const token = localStorage.getItem('access');
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        
        // Crea una copia del objeto para no modificar el original
        const payload = { ...data };
        
        // Asegurarse que las fechas tienen el formato correcto si existen
        if (payload.start_date instanceof Date) {
            payload.start_date = payload.start_date.toISOString().split('T')[0];
        }
        
        if (payload.end_date instanceof Date) {
            payload.end_date = payload.end_date.toISOString().split('T')[0];
        }
        
        // Muestra en consola qué estamos enviando, útil para depurar
        console.log('Enviando solicitud de reporte con fechas:', payload);
        
        return this.http.post<any>(this.baseUrl, payload, { headers });
    }
}
