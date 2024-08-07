export interface TagType {
    id: number;
    label: string; // Changed back to label from content
    parentId?: number;
}

export interface TagType {
    id: number;
    label: string; // Changed back to label from content
    parentId?: number;
}

export const tagsData: TagType[] = [
    { id: 1, label: 'בעיות התנהגות' },
    { id: 2, label: 'התקפי זעם', parentId: 1 },
    { id: 3, label: 'תוקפנות', parentId: 1 },
    { id: 4, label: 'שקרים', parentId: 1 },
    { id: 5, label: 'גניבה', parentId: 1 },
    { id: 6, label: 'קשיי למידה' },
    { id: 7, label: 'דיסלקציה', parentId: 6 },
    { id: 8, label: 'דיסגרפיה', parentId: 6 },
    { id: 9, label: 'דיסקלקוליה', parentId: 6 },
    { id: 10, label: 'קשיי ריכוז', parentId: 6 },
    { id: 11, label: 'יחסים חברתיים' },
    { id: 12, label: 'חברות', parentId: 11 },
    { id: 13, label: 'חרם חברתי', parentId: 11 },
    { id: 14, label: 'קונפליקטים חברתיים', parentId: 11 },
    { id: 15, label: 'ביישנות', parentId: 11 },
    { id: 16, label: 'התפתחות רגשית' },
    { id: 17, label: 'ויסות רגשי', parentId: 16 },
    { id: 18, label: 'כעס ותסכול', parentId: 16 },
    { id: 19, label: 'שמחה והתרגשות', parentId: 16 },
    { id: 20, label: 'חרדות ופחדים', parentId: 16 },
    { id: 21, label: 'תקשורת עם ילדים' },
    { id: 22, label: 'הקשבה ואמפתיה', parentId: 21 },
    { id: 23, label: 'שיתוף פעולה', parentId: 21 },
    { id: 24, label: 'כישורי שיחה', parentId: 21 },
    { id: 25, label: 'סדר יום והרגלים' },
    { id: 26, label: 'זמן שינה', parentId: 25 },
    { id: 27, label: 'זמן ארוחה', parentId: 25 },
    { id: 28, label: 'משחק ופנאי', parentId: 25 },
    { id: 29, label: 'התמודדות עם קשיים' },
    { id: 30, label: 'כישורי התמודדות', parentId: 29 },
    { id: 31, label: 'תמיכה רגשית', parentId: 29 },
    { id: 32, label: 'עזרה מקצועית', parentId: 29 },
    { id: 33, label: 'בריאות והתפתחות' },
    { id: 34, label: 'תזונה ובריאות', parentId: 33 },
    { id: 35, label: 'פעילות גופנית', parentId: 33 },
    { id: 36, label: 'מעקב רפואי', parentId: 33 },
    { id: 37, label: 'סביבה חינוכית' },
    { id: 38, label: 'בית ספר', parentId: 37 },
    { id: 39, label: 'גן ילדים', parentId: 37 },
    { id: 40, label: 'חינוך ביתי', parentId: 37 },
    { id: 41, label: 'תחומי עניין ופנאי' },
    { id: 42, label: 'תחביבים ותחומי עניין', parentId: 41 },
    { id: 43, label: 'פעילויות חוץ', parentId: 41 },
    { id: 44, label: 'משחקי מחשב ווידאו', parentId: 41 },
    { id: 45, label: 'קריאה וספרים', parentId: 41 },
];