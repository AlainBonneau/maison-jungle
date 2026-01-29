import { useState } from "react";
import type { PaymentFormData } from "../types/payment";

export type PaymentFieldName = keyof PaymentFormData;

// Erreurs par champ: string si erreur, null/undefined sinon
export type PaymentFormErrors = Partial<
  Record<PaymentFieldName, string | null>
>;

export const usePaymentForm = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState<PaymentFormErrors>({});

  const updateField = <K extends PaymentFieldName>(
    name: K,
    value: PaymentFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateField = (
    name: PaymentFieldName,
    value: string,
  ): string | null => {
    switch (name) {
      case "cardNumber": {
        const cleanCardNumber = value.replace(/\s/g, "");
        if (!/^\d{13,19}$/.test(cleanCardNumber)) {
          return "Numéro de carte invalide";
        }
        return null;
      }

      case "expiryDate": {
        if (!/^\d{2}\/\d{2}$/.test(value)) {
          return "Format de date invalide (MM/AA)";
        }

        const [monthStr, yearStr] = value.split("/");
        const month = Number(monthStr);
        const year = Number(yearStr);

        if (
          Number.isNaN(month) ||
          Number.isNaN(year) ||
          month < 1 ||
          month > 12
        ) {
          return "Date d'expiration invalide";
        }

        // Carte valide jusqu'à la fin du mois
        const now = new Date();
        const expiryEnd = new Date(2000 + year, month, 0, 23, 59, 59, 999);
        if (expiryEnd < now) {
          return "Carte expirée";
        }
        return null;
      }

      case "cvv": {
        if (!/^\d{3,4}$/.test(value)) {
          return "Code de sécurité invalide";
        }
        return null;
      }

      case "cardholderName": {
        const trimmed = value.trim();
        if (!trimmed) return "Nom du titulaire requis";
        if (trimmed.length < 2) return "Nom trop court";
        return null;
      }

      default:
        return null;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: PaymentFormErrors = {};
    let isValid = true;

    (Object.keys(formData) as PaymentFieldName[]).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const match = v.substring(0, 19); // max 19 digits
    const parts: string[] = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const resetForm = (): void => {
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    validateField,
    validateForm,
    formatCardNumber,
    formatExpiryDate,
    resetForm,
  };
};
