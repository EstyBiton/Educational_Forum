import { useEffect, useState } from "react";
import { deletePost, getPostById, getPostByToken } from "../../data/services/post.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostType } from "../../data/types/post.types";

//לא מצליחה בשום פנים ואופן לשדר בדף של המחיקה את תוכן הפוסט המועמד למחיקה. לא מצליחה
//אולי צריך להעביר בסישארפ חוץ מטוקן גם קונטנס
//הבעיה הייתה שהאיידי לא מופיע בURL אלא רק הטוקן
//ולכן לא יכולתי להשתמש בדרך הישנה אלא רק על ידי קבלת הפוסט לפי הטוקן, וזה בכלל לא עבד!! כי תמיד זה נשאר נל

//הייתי רוצה שיופיע ביוארל גם האיידי וגם הטוקן וכך נשלוף את האיידי משם, כרגע אין שם איידי אז זה לא אפשרי
const DeletePostPage: React.FC = () => {
        const [token, setToken] = useState<string | null>(null);
        const [post, setPost] = useState<PostType | null>(null);
        const [isDeleted, setIsDeleted] = useState<boolean>(false);
        const [deleteButtonDisabled, setDeleteButtonDisabled] = useState<boolean>(false);
    
        useEffect(() => {
            // חילוץ הטוקן מה-URL
            const pathname = window.location.pathname;
            const tokens = pathname.split('/');
            const extractedToken = tokens[tokens.length - 1];
            console.log('Extracted Token:', extractedToken);
            setToken(extractedToken);
        }, []); // ה- useEffect הזה ירוץ רק פעם אחת, כשהקומפוננט נטען
    
        useEffect(() => {
            const fetchPost = async () => {
                try {
                    if (token) {
                        const fetchedPost = await getPostByToken(token);
                        setPost(fetchedPost);
                        console.log('Fetched Post:', fetchedPost);
                    }
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            };
    
            if (token) {
                fetchPost();
            }
        }, [token]); 
    
    const handleDeleteClick = async () => {
        try {
            if (token && !deleteButtonDisabled) {
                const pathname = window.location.pathname;
                const tokens = pathname.split('/');
                const token = tokens[tokens.length - 1]; // קח את האינדקס האחרון במערך המפרקם
    
                if (token) {
                    await deletePost(token);
                    console.log('Post deleted successfully');
                    setIsDeleted(true);
                    setDeleteButtonDisabled(true);
    
                    // Handle success (e.g., show message or redirect)
                } else {
                    console.error('Token is missing');
                }
            }
        } catch (error) {
            console.error('Error deleting post:', error); 
            alert('אינך בעל הרשאה לבצע פעולה זו')
        }
    };
    
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'white',
        color: '#2196F3',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    };

    const contentStyle: React.CSSProperties = {
        maxWidth: '600px',
        padding: '20px'
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '2.1em',
        marginBottom: '20px', // Space between heading and content
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red'
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        fontSize: '1.5em',
        cursor: 'pointer',
        marginBottom: '10px',
        opacity: deleteButtonDisabled ? 0.6 : 1,
        pointerEvents: deleteButtonDisabled ? 'none' : 'auto',
    };

    const linkContainerStyle: React.CSSProperties = {
        display: 'inline-block',
        margin: '10px',
        position: 'relative',
    };

    const linkStyle: React.CSSProperties = {
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '10px 20px',
        fontSize: '1.2em',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'color 0.3s',
        border: 'none',
        borderRadius: '5px'
    };

    const reportTextStyle: React.CSSProperties = {
        color: 'black',
        fontSize: '1.2em'
    };

    const reportContentStyle: React.CSSProperties = {
        color: post ? '#2196F3' : 'black',
        fontSize: '1.7em'
    };
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={headingStyle}>?האם אתה בטוח שברצונך למחוק את התגובה</h1>
                {/* <p style={reportTextStyle}>להלן תוכן התגובה</p> */}
                <p style={reportContentStyle}>{post?.content}</p>
                <button style={buttonStyle} onClick={handleDeleteClick} disabled={deleteButtonDisabled}>
                    מחק פוסט
                </button>
                {isDeleted && (
                    <div>
                        <p>!המחיקה התבצעה בהצלחה</p>
                        <Link to="/" style={linkStyle}>
                            <span>לחזרה לדף הבית</span>
                        </Link>
                    </div>
                )}
                {!isDeleted && (
                    <div style={linkContainerStyle}>
                        <Link to="/" style={linkStyle}>
                            <span>לחזרה לדף הבית</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeletePostPage;
