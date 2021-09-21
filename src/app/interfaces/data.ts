 enum BM_TYPE {
    G = 'gene',
    P = 'protein'
    }
    
export interface Structure {
     name?: string;
     id?: string;
     rdfs_label?: string;
     b_type?: BM_TYPE;
    }
export interface Row {
     anatomical_structures: Array<Structure>;
     cell_types: Array<Structure>;
     biomarkers: Array<Structure>;
     
    }

export interface IData{
    csv:string;
    data:Array<Row>;
    parsed:Array<any>;
}

export interface Terms{
    "iri" : string,
    "label" : string,
    "description" : string,
    "annotation" : {definition:[string]},
    "synonyms" : string,
    "ontology_name" : string,
    "ontology_prefix" : string,
    "ontology_iri" : string,
    "is_obsolete" : Boolean,
    "term_replaced_by" : string,
    "is_defining_ontology" : string,
    "has_children" : Boolean,
    "is_root" : Boolean,
    "short_form" : string,
    "obo_id" : string,
    "in_subset" : Array<any>,
    "obo_definition_citation" : Array<any>,
    "obo_xref" : Array<any>,
    "obo_synonym" : Array<any>
    "is_preferred_root" : Boolean,
    "_links" : any
}

export interface Structure_Data{
"_embedded" : {
    terms:Terms[]
}
"_links" : {},
"page" : {}
}


export interface Anatomical_Details{
    name:string,
    description:string,
    ontology_link:string,
    iri:string
}
