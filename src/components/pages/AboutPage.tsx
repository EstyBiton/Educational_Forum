import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    background: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    direction: 'rtl',
    marginTop: '64px', // מרווח כדי לא להסתיר את התוכן על ידי ה-NavBar
  },
  title: {
    color: '#333',
    marginBottom: '16px',
  },
  subtitle: {
    color: '#333',
    marginBottom: '12px',
  },
  listItem: {
    marginBottom: '8px',
  },
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    margin: 0,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
}));

const AboutPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Container className={classes.container}>
        <Typography variant="h5" className={classes.title}>
          מי אנחנו
        </Typography>
        <Typography variant="body1" paragraph>
          ברוכים הבאים לפורום החינוכי שלנו - מרחב ייחודי ומקצועי המיועד לתמיכה וסיוע להורים בנושאי חינוך וגידול ילדים. מטרתנו היא להעניק להורים כלים ועצות מותאמות אישית ממיטב היועצים המומחים בתחום החינוך, תוך יצירת קהילה תומכת ומבינה.
        </Typography>

        <Typography variant="h6" className={classes.subtitle}>
          מה אנחנו מציעים?
        </Typography>
        <Typography variant="body1" paragraph>
          הפורום החינוכי שלנו נבנה מתוך הבנה עמוקה של האתגרים היומיומיים איתם מתמודדים הורים בכל שלבי הגידול והחינוך. כאן, כל הורה יכול לפתוח אשכול ולשתף את הבעיה או השאלה החינוכית שלו, כשהוא מקבל מענה מקצועי ומדויק מיועצים מומחים.
        </Typography>

        <Typography variant="h6" className={classes.subtitle}>
          מה יוצא לכם מזה כהורים:
        </Typography>
        <ul>
          <li className={classes.listItem}><strong>מענה מקצועי ומותאם אישית:</strong> כל שאלה מתויגת בנושאים הרלוונטיים, ומיועדת ליועצים המתמחים בתחום זה בלבד.</li>
          <li className={classes.listItem}><strong>שקיפות ואמינות:</strong> היועצים שלנו מציגים את פרטיהם, כולל תעודות, מוסדות לימוד ותחומי התמחות, כך שתוכלו להיות בטוחים שהמענה שאתם מקבלים הוא אמין ומקצועי.</li>
          <li className={classes.listItem}><strong>קשר אישי עם היועץ:</strong> התרשמתם מהתשובה שקיבלתם? תוכלו ליצור קשר ישיר עם היועץ דרך האתר ולקבל ליווי אישי ומעמיק יותר.</li>
        </ul>

        <Typography variant="h6" className={classes.subtitle}>
          מה יוצא לכם מזה כיועצים:
        </Typography>
        <ul>
          <li className={classes.listItem}><strong>פלטפורמה מקצועית ובולטת:</strong> האתר שלנו מציע לכם במה מקצועית להציג את הידע והניסיון שלכם ולהרחיב את מעגל הלקוחות שלכם.</li>
          <li className={classes.listItem}><strong>חשיפה לקהל יעד ממוקד:</strong> הפורום מושך הורים המחפשים ייעוץ מקצועי ואיכותי, מה שמאפשר לכם להגיע לקהל היעד המדויק שלכם.</li>
          <li className={classes.listItem}><strong>הזדמנות להעמיק את הקשר המקצועי:</strong> לאחר שהורים מתרשמים מתשובותיכם, יש לכם אפשרות להמשיך ולייעץ להם באופן פרטני כאשר הם פונים אליכם.</li>
        </ul>

        <Typography variant="h6" className={classes.subtitle}>
          למה דווקא אצלנו?
        </Typography>
        <ul>
          <li className={classes.listItem}><strong>מקצועיות:</strong> היועצים שלנו הם אנשי מקצוע מנוסים ומומחים בתחומם, המעניקים מענה מקיף ומדויק לבעיות ושאלות חינוכיות.</li>
          <li className={classes.listItem}><strong>קהילתיות:</strong> אנו מאמינים בכוח של קהילה תומכת. כאן תוכלו למצוא שותפים לדרך, לקבל תמיכה ועצה ולהיות חלק מקהילה חינוכית פעילה.</li>
          <li className={classes.listItem}><strong>נגישות ונוחות:</strong> הממשק שלנו ידידותי ונוח לשימוש, מה שמאפשר לכם לעלות שאלות ולקבל תשובות בקלות ובמהירות.</li>
        </ul>

        <Typography variant="body1">
          אנו מזמינים אתכם להצטרף אלינו, לשתף ולהתייעץ, ולמצוא את התשובות והעצות הטובות ביותר עבורכם ועבור ילדיכם. יחד, ניצור סביבה חינוכית תומכת ומקדמת.
        </Typography>
      </Container>
    </div>
  );
};

export default AboutPage;