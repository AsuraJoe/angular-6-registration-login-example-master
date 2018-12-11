import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Form } from '../_models/form'

@Injectable()

export class FormService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Form[]>(`${config.apiUrl}/forms`);
    }

    getByUserId(id: string) {
        return this.http.get<Form[]>(`${config.apiUrl}/forms/userforms/` + id); 
    }

    create(form: Form) {
        return this.http.post(`${config.apiUrl}/forms/submit`, form);
    }
}