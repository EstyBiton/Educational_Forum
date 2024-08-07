import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

    warningIcon: {
        color: 'red',
        marginBottom: '10px',
    },
    linkContainer: {
        display: 'inline',
        margin: '0 10px',
        color: '#2196F3',
        textDecoration: 'none',
        fontSize: '1.5em',
        cursor: 'pointer',
        position: 'relative',
        transition: 'color 0.3s',
    },
    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '-4px',
        borderBottom: '2px solid #1976D2',
        transition: 'width 0.3s ease-in-out',
    },
    dialogContent: {
        textAlign: 'center',
    },
    heading: {
        fontSize: '2.5em',
        marginBottom: '20px',
    },
    flexContainer: {
        fontSize: '2.5em',
        display: 'inline-flex',
        alignItems: 'center',
    },
 

});

export default useStyles;
