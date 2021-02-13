# Annotation Doc

# Search - list page free search 
  * label - displayed in free search input  
  * field - array of filed name *Field name should be available in property key*  

# Filter - list page filter
takes array of field name *Field name should be available in property key*  

# Listpage - list page column   
takes array of field name *Field name should be available in property key*  

# Header - object page header  
  * title - field name *Field name should be available in property key*  
  * subtitle - field name *Field name should be available in property key*  
  * image - field name with image URL *Field name should be available in property key and a invalid url result in empty image*  
  * headerContent - field displayed in object header  
      * field - array of field name  *Field name should be available in property key*  
  * keyInfos - ??  
      * field - ??  
  * headerActions - custom action implementation [Implementation_Pending]  

# Action - default action both in list and object page 
  * updateEnabled - enable update button  
  * deleteEnabled - enable delete button  
  * CreateEnabled - enable create button  

# facet - array of object page facet 
  * id - facet id  
  * label - Object page facet  
  * type - facet type  
      * available options - fieldGroup, lineItem, imageLinks  
  * association - specify association name *association name should be available in properyt key*  
  * field - array of filed name *Field name should be available in property key*  
  * action - valid only for "lineItem" type  
      * deleteEnabled - enable delete button  
      * CreateEnabled - enable create button  
  * contextType - ??

# suggestion - value help for field *field should be specified in key*
  * key - filed name *Field name should be available in property key*  
  * value -  
      * valuetype - type of valuehelp  
          * available options - standard, constant (standard - value derived from server)  
      * value - relative URL or array *key will be considered for selection and value will be displayed to user*  
          * relative URL  
            e.g "/admin/itemCategory?key=_id&value=name"  
          * array of fixed value  
            e.g [{key: "", value: ""}]  
  
# property - entity property or field value  
**second level hierarchy represents association**  
  * key - field name **this should be same as field name defined in server**  
  * value -  
      * label - field name displayed to end user  
      * importance - used for responsiveness  
          * available option - HIGH, MEDIUM, LOW  
      * component - how it's should be displayed in read only mode  
          * available options - Label, ObjectStatus(with color), ComboBox  
      * editComponent - how it's should be displayed in edit mode  
          * available options - Label, Input, ComboBox, MultiComboBox, DateRange, DatePicker  
      * filterComponent - how it's should be displayed in listpage filter bar  
      * available options - Input, ComboBox, MultiComboBox, DateRange, DatePicker  
      * criticality - field name represent color *Field name should be available in property key*  
          * available option - Success - green, Error - Red  
      * key - (true/false) boolean field to represent key value  
      * readOnly - if true, field will behave as readonly in edit & create mode  
    
# metadata - key value pair provide the entity structure with inital value  
**USED DURING CREATE AS INITAL VALUE**  



