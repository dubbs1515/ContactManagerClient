import React from 'react'
import PropTypes from 'prop-types'


// Destructures the props argument
const Navbar = ({ title, icon }) => {
    return (
        <div>
            
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper'
}

export default Navbar
