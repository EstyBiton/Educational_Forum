//של משתמשים TYPES בפרויקט ממוצע יש שלושה 
//:1
//משמש להתחברות המשתמש - רק שם וסיסמה נדרשים
export type UserSignInType = {
    name: string;
    password: string;
  };
  

//:2
//מכיל את כל פרטי המידע של המשתמש
export type FullUserType = {
        id?: number; // מזהה אופציונלי
        name: string;
        email: string;
        password: string;
          };
      
//WORD למה המזהה הוא אופציונלי? כתוב בקובץ 
        
//:3
//סוג זה משמש לתיאור משתמש לאחר שהוא כבר נרשם או עודכן במערכת. 
//נשתמש בו:
//.א
//כאשר אנו מציגים פרטים של משתמש בממשק המשתמש, כמו בדף פרופיל משתמש או ברשימת משתמשים.
//.ב
//Redux state-בעת אחסון נתוני משתמשים ב
//כדי לנהל מצב המשתמשים בצורה קלה ויעילה יותר.

          export type UserType = {
            id: number;
            name: string;
            email: string;
          };
