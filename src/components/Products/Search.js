import React, { useContext, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import UserContext from '../../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Search(props){
    const {user} = useContext(UserContext)

    const [searchCriteria, setSearchCriteria] = useState('')

    return(
        <>
             <InputGroup className="mb-3 w-25">
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Search for a product"
                />
                <InputGroup.Text as={Button} className="btn-secondary-custom" variant="dark" id="inputGroup-sizing-default">
                    <FontAwesomeIcon icon={solid('magnifying-glass')} /> Search
                </InputGroup.Text>
            </InputGroup>
        </>
    )
}