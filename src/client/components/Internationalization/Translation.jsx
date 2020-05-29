import React from 'react'
import i18n from '../../i18n';
import { withNamespaces } from 'react-i18next';

import { Grid, Button } from '@material-ui/core'

import '../../index.css'

const translation = ({ t }) => {

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={10} sm={8}>

                    <div className="file-upload-heading">
                        <h2>{t('React File Upload')}</h2>
                    </div>

                    <div className="box-shadow">
                        <div className="text-center">
                            {t('Welcome to this page')}
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className="english-button margin-top-5"
                            onClick={() => changeLanguage('en')}
                        >
                            English
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className="hindi-button margin-top-5"
                            onClick={() => changeLanguage('hi')}
                        >
                            Hindi
                        </Button>
                    </div>
                </Grid>
            </Grid>
            {/* <div>
                <button onClick={() => changeLanguage('hi')}>de</button>
                <button onClick={() => changeLanguage('en')}>en</button>
                <h1>{t('Welcome')}</h1>
                <h1>{t('Thanks')}</h1>
            </div> */}
        </>
    )
}

export default withNamespaces()(translation)