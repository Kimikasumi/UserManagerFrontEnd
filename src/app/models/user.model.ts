import { City } from "./city.model"
import { DocumentTypee } from "./documentType.model"

export class User{
    pk: number = 0
    documentType: DocumentTypee = new DocumentTypee()
    documentNumber: string = ""
    name: string = ""
    lastName: string = ""
    city: City = new City()
}