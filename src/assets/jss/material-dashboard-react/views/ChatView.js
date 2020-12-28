import dropdownStyle from "assets/jss/material-dashboard-react/dropdownStyle.js";
import {
  defaultFont,
  dangerColor,
  whiteColor
} from "assets/jss/material-dashboard-react.js";

const styles = (theme) =>
  ({
    ...dropdownStyle(theme),
    search: {
      "& > div": {
        marginTop: "0"
      },
      [theme.breakpoints.down("sm")]: {
        margin: "10px 15px !important",
        float: "none !important",
        paddingTop: "1px",
        paddingBottom: "1px",
        padding: "0!important",
        width: "60%",
        marginTop: "40px",
        "& input": {
          color: whiteColor
        },

      },
      [theme.breakpoints.up("sm")]: {
        margin: "10px 15px !important",
        float: "none !important",
        paddingTop: "1px",
        paddingBottom: "1px",
        padding: "0!important",
        width: "400px",
        marginTop: "40px",
        "& input": {
          color: whiteColor
        }
      },
    },
    linkText: {
      zIndex: "4",
      ...defaultFont,
      fontSize: "14px",
      margin: "0px"
    },
    buttonLink: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        margin: "10px 15px 0",
        width: "-webkit-fill-available",
        "& svg": {
          width: "24px",
          height: "30px",
          marginRight: "15px",
          marginLeft: "-15px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
          fontSize: "24px",
          lineHeight: "30px",
          width: "24px",
          height: "30px",
          marginRight: "15px",
          marginLeft: "-15px"
        },
        "& > span": {
          justifyContent: "flex-start",
          width: "100%"
        }
      }
    },
    searchButton: {
      [theme.breakpoints.down("sm")]: {
        top: "-50px !important",
        marginRight: "22px",
        float: "right"
      },
    },
    margin: {
      zIndex: "4",
      margin: "0"
    },
    searchIcon: {
      width: "17px",
      zIndex: "4"
    },
    notifications: {
      zIndex: "4",
      [theme.breakpoints.up("md")]: {
        position: "absolute",
        top: "2px",
        border: "1px solid " + whiteColor,
        right: "4px",
        fontSize: "9px",
        background: dangerColor[0],
        color: whiteColor,
        minWidth: "16px",
        height: "16px",
        borderRadius: "10px",
        textAlign: "center",
        lineHeight: "16px",
        verticalAlign: "middle",
        display: "block"
      },
      [theme.breakpoints.down("sm")]: {
        ...defaultFont,
        fontSize: "14px",
        marginRight: "8px"
      }
    },
    manager: {
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      },
      display: "inline-block"
    },
    searchWrapper: {
      [theme.breakpoints.down("sm")]: {
        width: "-webkit-fill-available",
        margin: "10px 15px 0"
      },
      display: "inline-block",
      textAlign: 'center'
    },
    typo: {
      paddingLeft: "25%",
      marginBottom: "40px",
      position: "relative"
    },
    note: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      bottom: "10px",
      color: "#c0c1c2",
      display: "block",
      fontWeight: "400",
      fontSize: "13px",
      lineHeight: "13px",
      left: "0",
      marginLeft: "20px",
      position: "absolute",
      width: "260px"
    },
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Poppins', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  });

export default styles;
