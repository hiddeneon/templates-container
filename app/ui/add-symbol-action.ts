"use server";
import { insertSymbol } from '../lib/data';

export async function addSymbolAction(formData: FormData) {
  return await insertSymbol(null, formData);
}
