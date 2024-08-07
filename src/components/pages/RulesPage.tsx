import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    background: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(8),
    direction: 'rtl',
  },
  title: {
    color: '#333',
  },
  list: {
    paddingLeft: '20px',
  },
}));

const RulesPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        כללי הפורום
      </Typography>
      <Typography>
        ברוכים הבאים לפורום החינוכי שלנו! כדי לשמור על סביבה נעימה, מקצועית ותומכת, אנו מבקשים מכל המשתתפים לעמוד בכללי הפורום הבאים:
      </Typography>

      <Typography variant="h6" className={classes.title}>
        כללים להורים:
      </Typography>
      <ul className={classes.list}>
        <li>
          <strong>שמרו על כבוד הדדי:</strong> אין להשתמש בשפה פוגענית, מעליבה או מזלזלת. אנו מצפים מכולם להתנהג בכבוד ובאדיבות כלפי חברי הפורום והיועצים.
        </li>
        <li>
          <strong>פרטיות וסודיות:</strong> הימנעו משיתוף מידע אישי מזהה של ילדיכם או של אחרים. שמרו על פרטיות המשפחה והקפידו לא לחשוף פרטים מזהים.
        </li>
        <li>
          <strong>דיוק בתיאור הבעיה:</strong> השתדלו לתאר את הבעיה או השאלה בצורה ברורה ומפורטת ככל האפשר כדי לאפשר ליועצים לתת מענה מדויק ומועיל.
        </li>
        <li>
          <strong>שימוש בתגיות נכונות:</strong> בעת פתיחת אשכול, בחרו את התגיות הרלוונטיות לנושא השאלה או הבעיה. כך נבטיח שהיועצים המתאימים ביותר יוכלו להגיב.
        </li>
        <li>
          <strong>פנייה ליועצים:</strong> ניתן ליצור קשר אישי עם יועץ רק לאחר שהוא הגיב לאשכול שלכם ואתם מעוניינים להעמיק את הייעוץ. אין לשלוח הודעות אישיות או בקשות פנייה ליועצים שלא הגיבו לשאלתכם.
        </li>
      </ul>

      <Typography variant="h6" className={classes.title}>
        כללים ליועצים:
      </Typography>
      <ul className={classes.list}>
        <li>
          <strong>שמרו על מקצועיות:</strong> כל תשובה צריכה להיות מקצועית, מבוססת על ידע וניסיון בתחום החינוך. אנו מצפים שהמענה יהיה אחראי ומדויק.
        </li>
        <li>
          <strong>שפה מכבדת ומכילה:</strong> יש להשתמש בשפה מכבדת ומכילה בכל התשובות. המטרה היא לתמוך ולעזור להורים ולא לבקר או לשפוט אותם.
        </li>
        <li>
          <strong>מענה במסגרת ההתמחות:</strong> יועץ רשאי להגיב רק לשאלות המתוייגות בתחומי ההתמחות שלו. כך נבטיח מענה איכותי ומדויק.
        </li>
        <li>
          <strong>שקיפות ואמינות:</strong> יש להציג פרטים אמיתיים ומדויקים בפרופיל היועץ. יועצים שיימצאו כי אינם עומדים בדרישות אלו יוסרו מהפורום.
        </li>
        <li>
          <strong>לא לפנות להורים מיוזמתכם:</strong> פנייה להורים תיעשה רק לאחר שההורה הביע עניין בתשובתכם ופנה אליכם ישירות דרך האתר.
        </li>
      </ul>

      <Typography variant="h6" className={classes.title}>
        כללים כלליים:
      </Typography>
      <ul className={classes.list}>
        <li>
          <strong>שמירה על חוקי מדינת ישראל:</strong> כל תוכן או תגובה הנכתבים בפורום חייבים להיות בהתאם לחוקי מדינת ישראל. אין לפרסם תכנים לא חוקיים, מסיתים או פוגעניים.
        </li>
        <li>
          <strong>פרסום עצמי:</strong> אין לפרסם שירותים, מוצרים או קישורים מסחריים ללא אישור מנהלי הפורום.
        </li>
        <li>
          <strong>ניהול ותחזוקת הפורום:</strong> מנהלי הפורום שומרים לעצמם את הזכות למחוק תוכן לא מתאים, לחסום משתמשים ולנקוט בצעדים אחרים לפי הצורך לשמירה על כללי הפורום.
        </li>
      </ul>

      <Typography>
        אנו מודים לכם על שיתוף הפעולה ומזמינים אתכם לקחת חלק פעיל בקהילה החינוכית שלנו. יחד, נוכל ליצור מרחב תומך ומועיל לכולם.
      </Typography>
    </Container>
  );
};

export default RulesPage;
