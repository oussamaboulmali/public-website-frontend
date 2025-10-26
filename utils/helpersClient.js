export function compareCaseSensitive(str1, str2) {
  // Vérification préliminaire si les chaînes sont exactement les mêmes
  if (str1 === str2) {
    // Vérification supplémentaire caractère par caractère pour s'assurer que la casse est respectée
    if (str1?.length === str2?.length) {
      for (let i = 0; i < str1?.length; i++) {
        // Comparaison du code Unicode de chaque caractère
        if (str1.charCodeAt(i) !== str2?.charCodeAt(i)) {
          return false;
        }
      }
      return true;
    }
    return true;
  }
  return false;
}
