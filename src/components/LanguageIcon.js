import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import '/node_modules/flag-icons/css/flag-icons.min.css'

class LanguageIcon extends PureComponent {
  render() {
    // explicitly do not render English
    if (this.props.language === 'English') {
      return null
    }
    let icon = undefined
    switch (this.props.language) {
      case 'Czech': icon = 'cz'; break
      case 'Dutch': icon = 'nl'; break
      case 'French': icon = 'fr'; break
      case 'German': icon = 'de'; break
      case 'Hungarian': icon = 'hu'; break
      case 'Italian': icon = 'it'; break
      case 'Japanese': icon = 'jp'; break
      case 'Polish': icon = 'pl'; break
      case 'Romanian': icon = 'ro'; break
      case 'Russian': icon = 'ru'; break
      case 'Spanish': icon = 'es'; break
      case 'Ukrainian': icon = 'ua'; break
      default: icon = undefined
    }
    if (icon !== undefined) {
      return <span
        className={`language fi fi-${icon}`}
        title={this.props.language}
      />
    }
    console.log('Unknown language: ' + this.props.language)
    return ' ?'+this.props.language
  }
}

LanguageIcon.propTypes = {
  language: PropTypes.string.isRequired
}

export default LanguageIcon
