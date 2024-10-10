import { Schema, Document, model } from 'mongoose';

// Definimos la interfaz para el tipo de documento
export interface SearchDocument extends Document {
  query: string;
  timestamp: Date;
}

// Definimos el esquema
export const SearchSchema = new Schema<SearchDocument>({
  query: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Creamos el modelo
export const SearchModel = model<SearchDocument>('Search', SearchSchema);
