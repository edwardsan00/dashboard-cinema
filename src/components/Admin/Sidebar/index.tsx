import React, { FunctionComponent } from "react"
import { makeStyles, Link } from '@material-ui/core'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'

interface IDashboardPath {
  label: string,
  path: string
}

const dashboradPath: Array<IDashboardPath> = [
  { label: "Dashboard", path: "/" },
  { label: "Películas", path: "/movies" },
  { label: "Turnos", path: "/turn" },
  { label: "Administradores", path: "/administrators" },
  { label: "Perfil", path: '/profile' },
  { label: 'Cerrar Sesión', path: '/logout' }
];

const useStyles = makeStyles(({ palette }) => ({
  sidebar: {
    height: "100%",
    overflowY: "auto",
    backgroundColor: palette.grey[200],
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
  },
  sidebarItem: {
    width: "100%",
    padding: "0 20px",
    marginBottom: 20,
  },
  sidebarLink: {
    display: "block",
    fontSize: "1rem",
    padding: "10px 20px",
    borderRadius: "4px",
    textDecoration: "none",
    color: palette.primary.dark,
    transition: "all .3s ease-in-out",
    "&:hover": {
      backgroundColor: palette.primary.dark,
      color: "white",
      textDecoration: "none",
      transition: "all .3s ease-in-out",
    },
  },
  sidebarActice: {
    backgroundColor: palette.primary.dark,
    color: "white",
    textDecoration: "none",
  },
}));

const Sidebar: FunctionComponent = (): JSX.Element => {
  const classes = useStyles()
  const location = useLocation()
  return (
    <div className={classes.sidebar}>
      <ul className={classes.sidebarList}>
        { dashboradPath.map(({ label, path }) => {
          return (
            <li key={path} className={classes.sidebarItem}>
              <Link
                component={RouterLink}
                className={clsx(
                  [ classes.sidebarLink,
                    location.pathname === `/admin${path}` && classes.sidebarActice,
                  ]
                )}
                to={`/admin${path}`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
