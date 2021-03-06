let lib  = (require )(`./lib` ) ;
let _  = (require )(`lodash` ) ;
let safe__MINUS__symbol  = (((require )(`./translator` ) )[(`safe_symbol` )]) ;
let __EQUALS__  = _.isEqual ;
let identical__QUESTION_MARK____BANG__  = ((a ,b ) => {return (a  === b );
} ) ;
let identity__BANG__  = ((a ) => {return a;
} ) ;
let coll__QUESTION_MARK__  = ((a ) => {return (or )((map__QUESTION_MARK__ )(a ) ,(array__QUESTION_MARK__ )(a ) ,(set__QUESTION_MARK__ )(a ) );
} ) ;
let primitive__QUESTION_MARK__  = ((a ) => {return (not )((coll__QUESTION_MARK__ )(a ) );
} ) ;
let type  = ((a ) => {return (reduce )(((acc ,curr ) => {return ((((empty__QUESTION_MARK__ )(acc ) ) !== false && ((empty__QUESTION_MARK__ )(acc ) ) !== null && ((empty__QUESTION_MARK__ )(acc ) ) !== undefined) ?
(() => {return ((((f ) => {return (((result ) => {return ((((f )(a ) ) !== false && ((f )(a ) ) !== null && ((f )(a ) ) !== undefined) ?
(() => {return result;
} )()
:
(() => {return null;
} )());
} ) )((second )(curr ) );
} ) )((first )(curr ) ) );
} )()
:
(() => {return acc;
} )());
} ) ,null ,new Map([[string__QUESTION_MARK__ ,`string` ] ,[nil__QUESTION_MARK__ ,`nil` ] ,[undefined__QUESTION_MARK__ ,`undefined` ] ,[boolean__QUESTION_MARK__ ,`boolean` ] ,[keyword__QUESTION_MARK__ ,`keyword` ] ,[number__QUESTION_MARK__ ,`number` ] ,[array__QUESTION_MARK__ ,`array` ] ,[map__QUESTION_MARK__ ,`map` ] ,[set__QUESTION_MARK__ ,`set` ] ]) );
} ) ;
let or  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return ((((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== false && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== null && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return (last )(args );
} )());
} )()
:
(() => {return ((((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== false && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== null && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return (apply )(or ,(rest )(args ) );
} )());
} )());
} )());
} )());
} ) ;
let and  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== false && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== null && ((truthy__QUESTION_MARK__ )((first )(args ) ) ) !== undefined) ?
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return (last )(args );
} )()
:
(() => {return (apply )(and ,(rest )(args ) );
} )());
} )());
} )()
:
(() => {return (first )(args );
} )());
} )());
} ) ;
let zero__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(a ,0 );
} ) ;
let count  = ((coll ) => {return ((((array__QUESTION_MARK__ )(coll ) ) !== false && ((array__QUESTION_MARK__ )(coll ) ) !== null && ((array__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((coll )[(`length` )]);
} )()
:
(() => {return ((((map__QUESTION_MARK__ )(coll ) ) !== false && ((map__QUESTION_MARK__ )(coll ) ) !== null && ((map__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((coll )[(`size` )]);
} )()
:
(() => {return ((((set__QUESTION_MARK__ )(coll ) ) !== false && ((set__QUESTION_MARK__ )(coll ) ) !== null && ((set__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((coll )[(`size` )]);
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return 0;
} )()
:
(() => {return ((((string__QUESTION_MARK__ )(coll ) ) !== false && ((string__QUESTION_MARK__ )(coll ) ) !== null && ((string__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((coll )[(`length` )]);
} )()
:
(() => {return (raise )(`count only works for arrays, maps, sets, strings, and nil` );
} )());
} )());
} )());
} )());
} )());
} ) ;
let empty__QUESTION_MARK__  = ((coll ) => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return (zero__QUESTION_MARK__ )((count )(coll ) );
} )());
} ) ;
let __MINUS____GREATER_THAN____QUESTION_MARK__nil  = ((n ) => {return ((((undefined__QUESTION_MARK__ )(n ) ) !== false && ((undefined__QUESTION_MARK__ )(n ) ) !== null && ((undefined__QUESTION_MARK__ )(n ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return n;
} )());
} ) ;
let first  = ((coll ) => {return (__MINUS____GREATER_THAN____QUESTION_MARK__nil )((((arr )(coll ) )[(`0` )]) );
} ) ;
let ffirst  = ((coll ) => {return (first )((first )(coll ) );
} ) ;
let second  = ((coll ) => {return (__MINUS____GREATER_THAN____QUESTION_MARK__nil )((((arr )(coll ) )[(`1` )]) );
} ) ;
let third  = ((coll ) => {return (__MINUS____GREATER_THAN____QUESTION_MARK__nil )((((arr )(coll ) )[(`2` )]) );
} ) ;
let last  = ((coll ) => {return ((((next )(coll ) ) !== false && ((next )(coll ) ) !== null && ((next )(coll ) ) !== undefined) ?
(() => {return (last )((rest )(coll ) );
} )()
:
(() => {return (first )(coll );
} )());
} ) ;
let butlast  = ((coll ) => {return ((((next )(coll ) ) !== false && ((next )(coll ) ) !== null && ((next )(coll ) ) !== undefined) ?
(() => {return (cons )((first )(coll ) ,(butlast )((rest )(coll ) ) );
} )()
:
(() => {return null;
} )());
} ) ;
let rest  = ((coll ) => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return (((arr )(coll ) ).slice (1 ));
} )());
} ) ;
let next  = ((coll ) => {return ((((r ) => {return ((((empty__QUESTION_MARK__ )(r ) ) !== false && ((empty__QUESTION_MARK__ )(r ) ) !== null && ((empty__QUESTION_MARK__ )(r ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return r;
} )());
} ) )((rest )(coll ) ) );
} ) ;
let cons  = ((el ,coll ) => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [el ];
} )()
:
(() => {return (apply )(conj ,[el ] ,coll );
} )());
} ) ;
let string__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(typeof a  ,`string` );
} ) ;
let number__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(typeof a  ,`number` );
} ) ;
let keyword__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(typeof a  ,`symbol` );
} ) ;
let boolean__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(typeof a  ,`boolean` );
} ) ;
let nil__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(a ,null );
} ) ;
let set__QUESTION_MARK__  = ((a ) => {return (a  instanceof Set );
} ) ;
let map__QUESTION_MARK__  = ((a ) => {return (a  instanceof Map );
} ) ;
let array__QUESTION_MARK__  = ((a ) => {return ((Array ).isArray (a ));
} ) ;
let arr  = ((a ) => {return ((((nil__QUESTION_MARK__ )(a ) ) !== false && ((nil__QUESTION_MARK__ )(a ) ) !== null && ((nil__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return ((((string__QUESTION_MARK__ )(a ) ) !== false && ((string__QUESTION_MARK__ )(a ) ) !== null && ((string__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return ((a ).split (`` ));
} )()
:
(() => {return ((((set__QUESTION_MARK__ )(a ) ) !== false && ((set__QUESTION_MARK__ )(a ) ) !== null && ((set__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return ((Array ).from (a ));
} )()
:
(() => {return ((((map__QUESTION_MARK__ )(a ) ) !== false && ((map__QUESTION_MARK__ )(a ) ) !== null && ((map__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return ((Array ).from (a ));
} )()
:
(() => {return ((((array__QUESTION_MARK__ )(a ) ) !== false && ((array__QUESTION_MARK__ )(a ) ) !== null && ((array__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return a;
} )()
:
(() => {return (raise )(`Given item not iterable` );
} )());
} )());
} )());
} )());
} )());
} ) ;
let array  = ((...args ) => {return args;
} ) ;
let set  = ((a ) => {return (new Set ((arr )(a ) ));
} ) ;
let hash__MINUS__set  = ((...args ) => {return (new Set (args ));
} ) ;
let hash__MINUS__map  = ((...kvs ) => {return (new Map ((apply )(pairwise ,kvs ) ));
} ) ;
let tuples__MINUS____GREATER_THAN__map  = ((tuples ) => {return (new Map (tuples ));
} ) ;
let keys  = ((m ) => {return (__MINUS____GREATER_THAN____GREATER_THAN__ )(m ,arr ,[map ,first ] );
} ) ;
let vals  = ((m ) => {return (__MINUS____GREATER_THAN____GREATER_THAN__ )(m ,arr ,[map ,second ] );
} ) ;
let pairwise  = ((...args ) => {return ((((__MINUS____GREATER_THAN__ )(args ,count ,even__QUESTION_MARK__ ) ) !== false && ((__MINUS____GREATER_THAN__ )(args ,count ,even__QUESTION_MARK__ ) ) !== null && ((__MINUS____GREATER_THAN__ )(args ,count ,even__QUESTION_MARK__ ) ) !== undefined) ?
(() => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return (cons )([(first )(args ) ,(second )(args ) ] ,(apply )(pairwise ,(rest )((rest )(args ) ) ) );
} )());
} )()
:
(() => {return (raise )(`expected an even number of arguments` );
} )());
} ) ;
let log  = ((...args ) => {return ((console ).log (...args ));
} ) ;
let __PLUS__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return 0;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return ((first )(args )  + (apply )(__PLUS__ ,(rest )(args ) ) );
} )());
} )());
} ) ;
let __MINUS__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`- requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (0  - (first )(args ) );
} )()
:
(() => {return ((first )(args )  - (apply )(__PLUS__ ,(rest )(args ) ) );
} )());
} )());
} ) ;
let __ASTERISK__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return 1;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (first )(args );
} )()
:
(() => {return ((first )(args )  * (apply )(__ASTERISK__ ,(rest )(args ) ) );
} )());
} )());
} ) ;
let __FORWARD_SLASH__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`/ requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return (1  / (first )(args ) );
} )()
:
(() => {return ((first )(args )  / (apply )(__ASTERISK__ ,(rest )(args ) ) );
} )());
} )());
} ) ;
let __PERCENT__  = ((a ,b ) => {return (a  % b );
} ) ;
let __LESS_THAN__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`< requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return ((first )(args )  < (second )(args ) );
} )()
:
(() => {return (and )(((first )(args )  < (second )(args ) ) ,(apply )(__LESS_THAN__ ,(second )(args ) ,(rest )((rest )(args ) ) ) );
} )());
} )());
} )());
} ) ;
let __LESS_THAN____EQUALS__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`<= requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return ((first )(args )  <= (second )(args ) );
} )()
:
(() => {return (and )(((first )(args )  <= (second )(args ) ) ,(apply )(__LESS_THAN____EQUALS__ ,(second )(args ) ,(rest )((rest )(args ) ) ) );
} )());
} )());
} )());
} ) ;
let __GREATER_THAN__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`> requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return ((first )(args )  > (second )(args ) );
} )()
:
(() => {return (and )(((first )(args )  > (second )(args ) ) ,(apply )(__GREATER_THAN__ ,(second )(args ) ,(rest )((rest )(args ) ) ) );
} )());
} )());
} )());
} ) ;
let __GREATER_THAN____EQUALS__  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`>= requires at least one argument` );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,1 ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return ((first )(args )  >= (second )(args ) );
} )()
:
(() => {return (and )(((first )(args )  >= (second )(args ) ) ,(apply )(__GREATER_THAN____EQUALS__ ,(second )(args ) ,(rest )((rest )(args ) ) ) );
} )());
} )());
} )());
} ) ;
let inc  = ((a ) => {return (__PLUS__ )(a ,1 );
} ) ;
let dec  = ((a ) => {return (__MINUS__ )(a ,1 );
} ) ;
let true__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(a ,true );
} ) ;
let false__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(a ,false );
} ) ;
let truthy__QUESTION_MARK__  = ((a ) => {return ((((false__QUESTION_MARK__ )(a ) ) !== false && ((false__QUESTION_MARK__ )(a ) ) !== null && ((false__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return false;
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(a ) ) !== false && ((nil__QUESTION_MARK__ )(a ) ) !== null && ((nil__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return false;
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )(a ,undefined ) ) !== false && ((identical__QUESTION_MARK____BANG__ )(a ,undefined ) ) !== null && ((identical__QUESTION_MARK____BANG__ )(a ,undefined ) ) !== undefined) ?
(() => {return false;
} )()
:
(() => {return true;
} )());
} )());
} )());
} ) ;
let falsey__QUESTION_MARK__  = ((a ) => {return ((((truthy__QUESTION_MARK__ )(a ) ) !== false && ((truthy__QUESTION_MARK__ )(a ) ) !== null && ((truthy__QUESTION_MARK__ )(a ) ) !== undefined) ?
(() => {return false;
} )()
:
(() => {return true;
} )());
} ) ;
let defined__QUESTION_MARK__  = ((a ) => {return (not )((identical__QUESTION_MARK____BANG__ )(a ,undefined ) );
} ) ;
let undefined__QUESTION_MARK__  = ((a ) => {return (identical__QUESTION_MARK____BANG__ )(undefined ,a );
} ) ;
let not  = falsey__QUESTION_MARK__ ;
let even__QUESTION_MARK__  = ((a ) => {return (zero__QUESTION_MARK__ )((__PERCENT__ )(a ,2 ) );
} ) ;
let odd__QUESTION_MARK__  = ((a ) => {return ((comp )(not ,even__QUESTION_MARK__ ) )(a );
} ) ;
let apply  = ((f ,...args ) => {return ((((additionalArgs ) => {return (((argsArray ) => {return (((args ) => {return (f.apply )(null ,args );
} ) )([...additionalArgs ,...argsArray ] );
} ) )((last )(args ) );
} ) )((arr )((butlast )(args ) ) ) );
} ) ;
let map  = ((f ,coll ) => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return ((((el ) => {return (cons )((f )(el ) ,(map )(f ,(rest )(coll ) ) );
} ) )((first )(coll ) ) );
} )());
} ) ;
let filter  = ((f ,coll ) => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return ((((el ) => {return ((((f )(el ) ) !== false && ((f )(el ) ) !== null && ((f )(el ) ) !== undefined) ?
(() => {return (cons )(el ,(filter )(f ,(rest )(coll ) ) );
} )()
:
(() => {return (filter )(f ,(rest )(coll ) );
} )());
} ) )((first )(coll ) ) );
} )());
} ) ;
let remove  = ((f ,coll ) => {return (filter )((complement )(f ) ,coll );
} ) ;
let reduce  = ((...args ) => {return ((((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== false && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== null && ((identical__QUESTION_MARK____BANG__ )((count )(args ) ,2 ) ) !== undefined) ?
(() => {return (reduce )((first )(args ) ,(first )((second )(args ) ) ,(rest )((second )(args ) ) );
} )()
:
(() => {return ((((f ) => {return (((val ) => {return (((coll ) => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return val;
} )()
:
(() => {return ((((item ) => {return (((result ) => {return (reduce )(f ,result ,(rest )(coll ) );
} ) )((f )(val ,item ) );
} ) )((first )(coll ) ) );
} )());
} ) )((arr )((third )(args ) ) );
} ) )((second )(args ) );
} ) )((first )(args ) ) );
} )());
} ) ;
let reverse  = ((coll ) => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return ((((r ) => {return (conj )(r ,(first )(coll ) );
} ) )((reverse )((rest )(coll ) ) ) );
} )());
} ) ;
let comp  = ((...fns ) => {return ((((fns ) => {return ((...args ) => {return (reduce )(((acc ,curr ) => {return (curr )(acc );
} ) ,(apply )((first )(fns ) ,args ) ,(rest )(fns ) );
} );
} ) )((reverse )(fns ) ) );
} ) ;
let partial  = ((f ,...args ) => {return ((...more ) => {return (apply )(f ,...args ,more );
} );
} ) ;
let thread  = ((type ) => {return ((val ,...exprs ) => {return (reduce )(((acc ,curr ) => {return ((((array__QUESTION_MARK__ )(curr ) ) !== false && ((array__QUESTION_MARK__ )(curr ) ) !== null && ((array__QUESTION_MARK__ )(curr ) ) !== undefined) ?
(() => {return ((((f ) => {return (((args ) => {return ((((identical__QUESTION_MARK____BANG__ )(type ,`first` ) ) !== false && ((identical__QUESTION_MARK____BANG__ )(type ,`first` ) ) !== null && ((identical__QUESTION_MARK____BANG__ )(type ,`first` ) ) !== undefined) ?
(() => {return (apply )(f ,acc ,args );
} )()
:
(() => {return ((((identical__QUESTION_MARK____BANG__ )(type ,`last` ) ) !== false && ((identical__QUESTION_MARK____BANG__ )(type ,`last` ) ) !== null && ((identical__QUESTION_MARK____BANG__ )(type ,`last` ) ) !== undefined) ?
(() => {return (f )(...args ,acc );
} )()
:
(() => {return (raise )(`Unknown thread type` );
} )());
} )());
} ) )((rest )(curr ) );
} ) )((first )(curr ) ) );
} )()
:
(() => {return (curr )(acc );
} )());
} ) ,val ,exprs );
} );
} ) ;
let __MINUS____GREATER_THAN__  = (thread )(`first` ) ;
let __MINUS____GREATER_THAN____GREATER_THAN__  = (thread )(`last` ) ;
let raise  = ((msg ) => {return (() => {throw msg })();
} ) ;
let get  = ((m ,k ) => {return ((((val ) => {return ((((defined__QUESTION_MARK__ )(val ) ) !== false && ((defined__QUESTION_MARK__ )(val ) ) !== null && ((defined__QUESTION_MARK__ )(val ) ) !== undefined) ?
(() => {return val;
} )()
:
(() => {return null;
} )());
} ) )(((((array__QUESTION_MARK__ )(m ) ) !== false && ((array__QUESTION_MARK__ )(m ) ) !== null && ((array__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return (lib.get )(m ,k );
} )()
:
(() => {return ((((map__QUESTION_MARK__ )(m ) ) !== false && ((map__QUESTION_MARK__ )(m ) ) !== null && ((map__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return ((m ).get (k ));
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(m ) ) !== false && ((nil__QUESTION_MARK__ )(m ) ) !== null && ((nil__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return (raise )(`Can only get from array, map, or nil` );
} )());
} )());
} )()) ) );
} ) ;
let get__MINUS__in  = ((m ,ks ) => {return ((((empty__QUESTION_MARK__ )(ks ) ) !== false && ((empty__QUESTION_MARK__ )(ks ) ) !== null && ((empty__QUESTION_MARK__ )(ks ) ) !== undefined) ?
(() => {return m;
} )()
:
(() => {return ((((k ) => {return (((val ) => {return (get__MINUS__in )(val ,(rest )(ks ) );
} ) )((get )(m ,k ) );
} ) )((first )(ks ) ) );
} )());
} ) ;
let contains__QUESTION_MARK__  = ((coll ,key ) => {return ((((array__QUESTION_MARK__ )(coll ) ) !== false && ((array__QUESTION_MARK__ )(coll ) ) !== null && ((array__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return (__LESS_THAN__ )(key ,(count )(coll ) );
} )()
:
(() => {return ((((or )((map__QUESTION_MARK__ )(coll ) ,(set__QUESTION_MARK__ )(coll ) ) ) !== false && ((or )((map__QUESTION_MARK__ )(coll ) ,(set__QUESTION_MARK__ )(coll ) ) ) !== null && ((or )((map__QUESTION_MARK__ )(coll ) ,(set__QUESTION_MARK__ )(coll ) ) ) !== undefined) ?
(() => {return ((coll ).has (key ));
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return false;
} )()
:
(() => {return (raise )(`Can only use contain? on arrays, maps, sets, and nil` );
} )());
} )());
} )());
} ) ;
let every__QUESTION_MARK__  = ((pred ,coll ) => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return true;
} )()
:
(() => {return ((((coll ) => {return (and )((__MINUS____GREATER_THAN__ )(coll ,first ,pred ) ,(every__QUESTION_MARK__ )(pred ,(rest )(coll ) ) );
} ) )((arr )(coll ) ) );
} )());
} ) ;
let conj  = ((coll ,...vals ) => {return ((((array__QUESTION_MARK__ )(coll ) ) !== false && ((array__QUESTION_MARK__ )(coll ) ) !== null && ((array__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [...coll ,...vals ];
} )()
:
(() => {return ((((set__QUESTION_MARK__ )(coll ) ) !== false && ((set__QUESTION_MARK__ )(coll ) ) !== null && ((set__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return (new Set ([...coll ,...vals ] ));
} )()
:
(() => {return ((((map__QUESTION_MARK__ )(coll ) ) !== false && ((map__QUESTION_MARK__ )(coll ) ) !== null && ((map__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((((every__QUESTION_MARK__ )(((v ) => {return (and )((array__QUESTION_MARK__ )(v ) ,(identical__QUESTION_MARK____BANG__ )((count )(v ) ,2 ) );
} ) ,vals ) ) !== false && ((every__QUESTION_MARK__ )(((v ) => {return (and )((array__QUESTION_MARK__ )(v ) ,(identical__QUESTION_MARK____BANG__ )((count )(v ) ,2 ) );
} ) ,vals ) ) !== null && ((every__QUESTION_MARK__ )(((v ) => {return (and )((array__QUESTION_MARK__ )(v ) ,(identical__QUESTION_MARK____BANG__ )((count )(v ) ,2 ) );
} ) ,vals ) ) !== undefined) ?
(() => {return (new Map ([...coll ,...vals ] ));
} )()
:
(() => {return (raise )(`Values conj'ed onto map must be two-valued arrays` );
} )());
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(coll ) ) !== false && ((nil__QUESTION_MARK__ )(coll ) ) !== null && ((nil__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return [...vals ];
} )()
:
(() => {return (raise )(`Can only conj onto arrays, maps, sets, and nil` );
} )());
} )());
} )());
} )());
} ) ;
let disj  = ((s ,v ,...vs ) => {return ((((nil__QUESTION_MARK__ )(s ) ) !== false && ((nil__QUESTION_MARK__ )(s ) ) !== null && ((nil__QUESTION_MARK__ )(s ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return ((((set__QUESTION_MARK__ )(s ) ) !== false && ((set__QUESTION_MARK__ )(s ) ) !== null && ((set__QUESTION_MARK__ )(s ) ) !== undefined) ?
(() => {return ((((result ) => {return ((((empty__QUESTION_MARK__ )(vs ) ) !== false && ((empty__QUESTION_MARK__ )(vs ) ) !== null && ((empty__QUESTION_MARK__ )(vs ) ) !== undefined) ?
(() => {return result;
} )()
:
(() => {return (apply )(disj ,result ,(first )(vs ) ,(rest )(vs ) );
} )());
} ) )((__MINUS____GREATER_THAN____GREATER_THAN__ )(s ,arr ,[remove ,(partial )(__EQUALS__ ,v ) ] ,set ) ) );
} )()
:
(() => {return (raise )(`disj expects a set or nil for the first argument` );
} )());
} )());
} ) ;
let drop  = ((n ,coll ) => {return ((((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== false && ((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== null && ((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== undefined) ?
(() => {return coll;
} )()
:
(() => {return (drop )((dec )(n ) ,(rest )(coll ) );
} )());
} ) ;
let take  = ((n ,coll ) => {return ((((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== false && ((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== null && ((or )((empty__QUESTION_MARK__ )(coll ) ,(__LESS_THAN____EQUALS__ )(n ,0 ) ) ) !== undefined) ?
(() => {return [];
} )()
:
(() => {return (cons )((first )(coll ) ,(take )((dec )(n ) ,(rest )(coll ) ) );
} )());
} ) ;
let flatten__MINUS__1  = ((coll ) => {return ((((array__QUESTION_MARK__ )(coll ) ) !== false && ((array__QUESTION_MARK__ )(coll ) ) !== null && ((array__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return ((((empty__QUESTION_MARK__ )(coll ) ) !== false && ((empty__QUESTION_MARK__ )(coll ) ) !== null && ((empty__QUESTION_MARK__ )(coll ) ) !== undefined) ?
(() => {return coll;
} )()
:
(() => {return ((((curr ) => {return ((((array__QUESTION_MARK__ )(curr ) ) !== false && ((array__QUESTION_MARK__ )(curr ) ) !== null && ((array__QUESTION_MARK__ )(curr ) ) !== undefined) ?
(() => {return (apply )(conj ,curr ,(flatten__MINUS__1 )((rest )(coll ) ) );
} )()
:
(() => {return (cons )(curr ,(flatten__MINUS__1 )((rest )(coll ) ) );
} )());
} ) )((first )(coll ) ) );
} )());
} )()
:
(() => {return [];
} )());
} ) ;
let assoc  = ((m ,...kvs ) => {return ((((empty__QUESTION_MARK__ )(kvs ) ) !== false && ((empty__QUESTION_MARK__ )(kvs ) ) !== null && ((empty__QUESTION_MARK__ )(kvs ) ) !== undefined) ?
(() => {return m;
} )()
:
(() => {return ((((__MINUS____GREATER_THAN__ )(kvs ,count ,even__QUESTION_MARK__ ) ) !== false && ((__MINUS____GREATER_THAN__ )(kvs ,count ,even__QUESTION_MARK__ ) ) !== null && ((__MINUS____GREATER_THAN__ )(kvs ,count ,even__QUESTION_MARK__ ) ) !== undefined) ?
(() => {return ((((k ) => {return (((v ) => {return ((((array__QUESTION_MARK__ )(m ) ) !== false && ((array__QUESTION_MARK__ )(m ) ) !== null && ((array__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return ((((number__QUESTION_MARK__ )(k ) ) !== false && ((number__QUESTION_MARK__ )(k ) ) !== null && ((number__QUESTION_MARK__ )(k ) ) !== undefined) ?
(() => {return ((((and )((__LESS_THAN____EQUALS__ )(k ,(count )(m ) ) ,(__GREATER_THAN____EQUALS__ )(k ,0 ) ) ) !== false && ((and )((__LESS_THAN____EQUALS__ )(k ,(count )(m ) ) ,(__GREATER_THAN____EQUALS__ )(k ,0 ) ) ) !== null && ((and )((__LESS_THAN____EQUALS__ )(k ,(count )(m ) ) ,(__GREATER_THAN____EQUALS__ )(k ,0 ) ) ) !== undefined) ?
(() => {return ((((beginning ) => {return (((end ) => {return (((result ) => {return (apply )(assoc ,result ,(rest )((rest )(kvs ) ) );
} ) )((apply )(conj ,[] ,...beginning ,v ,end ) );
} ) )((drop )((inc )(k ) ,m ) );
} ) )((take )(k ,m ) ) );
} )()
:
(() => {return (raise )(`Index out of bounds` );
} )());
} )()
:
(() => {return (raise )(`Index must be a number` );
} )());
} )()
:
(() => {return ((((map__QUESTION_MARK__ )(m ) ) !== false && ((map__QUESTION_MARK__ )(m ) ) !== null && ((map__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return ((((entries ) => {return (((result ) => {return (apply )(assoc ,result ,(rest )((rest )(kvs ) ) );
} ) )((apply )(hash__MINUS__map ,entries ) );
} ) )((__MINUS____GREATER_THAN__ )(m ,arr ,flatten__MINUS__1 ,[conj ,k ,v ] ) ) );
} )()
:
(() => {return ((((or )((nil__QUESTION_MARK__ )(m ) ,(undefined__QUESTION_MARK__ )(m ) ) ) !== false && ((or )((nil__QUESTION_MARK__ )(m ) ,(undefined__QUESTION_MARK__ )(m ) ) ) !== null && ((or )((nil__QUESTION_MARK__ )(m ) ,(undefined__QUESTION_MARK__ )(m ) ) ) !== undefined) ?
(() => {return (apply )(assoc ,new Map([]) ,kvs );
} )()
:
(() => {return (raise )(`Expected one of array, map, or nil` );
} )());
} )());
} )());
} ) )((second )(kvs ) );
} ) )((first )(kvs ) ) );
} )()
:
(() => {return (raise )(`Even number of keys and values required` );
} )());
} )());
} ) ;
let assoc__MINUS__in  = ((m ,path ,v ) => {return ((((empty__QUESTION_MARK__ )(path ) ) !== false && ((empty__QUESTION_MARK__ )(path ) ) !== null && ((empty__QUESTION_MARK__ )(path ) ) !== undefined) ?
(() => {return m;
} )()
:
(() => {return ((((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== false && ((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== null && ((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== undefined) ?
(() => {return (assoc )(m ,(first )(path ) ,v );
} )()
:
(() => {return ((((next__MINUS__item ) => {return (((result ) => {return (assoc )(m ,(first )(path ) ,result );
} ) )((assoc__MINUS__in )(next__MINUS__item ,(rest )(path ) ,v ) );
} ) )((get )(m ,(first )(path ) ) ) );
} )());
} )());
} ) ;
let dissoc  = ((m ,k ,...ks ) => {return ((((map__QUESTION_MARK__ )(m ) ) !== false && ((map__QUESTION_MARK__ )(m ) ) !== null && ((map__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return ((((result ) => {return ((((empty__QUESTION_MARK__ )(ks ) ) !== false && ((empty__QUESTION_MARK__ )(ks ) ) !== null && ((empty__QUESTION_MARK__ )(ks ) ) !== undefined) ?
(() => {return result;
} )()
:
(() => {return (apply )(dissoc ,result ,(first )(ks ) ,(rest )(ks ) );
} )());
} ) )((__MINUS____GREATER_THAN____GREATER_THAN__ )(m ,arr ,[remove ,((tuple ) => {return (identical__QUESTION_MARK____BANG__ )((first )(tuple ) ,k );
} ) ] ,tuples__MINUS____GREATER_THAN__map ) ) );
} )()
:
(() => {return ((((nil__QUESTION_MARK__ )(m ) ) !== false && ((nil__QUESTION_MARK__ )(m ) ) !== null && ((nil__QUESTION_MARK__ )(m ) ) !== undefined) ?
(() => {return null;
} )()
:
(() => {return (raise )(`Expected a map nor nil for the first argument` );
} )());
} )());
} ) ;
let update  = ((m ,k ,f ,...args ) => {return ((((v ) => {return (((result ) => {return (assoc )(m ,k ,result );
} ) )((apply )(f ,v ,args ) );
} ) )((get )(m ,k ) ) );
} ) ;
let update__MINUS__in  = ((m ,path ,f ,...args ) => {return ((((empty__QUESTION_MARK__ )(path ) ) !== false && ((empty__QUESTION_MARK__ )(path ) ) !== null && ((empty__QUESTION_MARK__ )(path ) ) !== undefined) ?
(() => {return m;
} )()
:
(() => {return ((((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== false && ((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== null && ((__MINUS____GREATER_THAN__ )(path ,count ,[__EQUALS__ ,1 ] ) ) !== undefined) ?
(() => {return (apply )(update ,m ,(first )(path ) ,f ,args );
} )()
:
(() => {return ((((next__MINUS__item ) => {return (((result ) => {return (assoc )(m ,(first )(path ) ,result );
} ) )((apply )(update__MINUS__in ,next__MINUS__item ,(rest )(path ) ,f ,args ) );
} ) )((get )(m ,(first )(path ) ) ) );
} )());
} )());
} ) ;
let str  = ((...args ) => {return ((((start ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return start;
} )()
:
(() => {return ((((__MINUS____GREATER_THAN__ )(args ,count ,[__EQUALS__ ,1 ] ) ) !== false && ((__MINUS____GREATER_THAN__ )(args ,count ,[__EQUALS__ ,1 ] ) ) !== null && ((__MINUS____GREATER_THAN__ )(args ,count ,[__EQUALS__ ,1 ] ) ) !== undefined) ?
(() => {return ((start ).concat ((first )(args ) ));
} )()
:
(() => {return ((((start ).concat ((first )(args ) )) ).concat ((apply )(str ,(rest )(args ) ) ));
} )());
} )());
} ) )(`` ) );
} ) ;
let max  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`max requires at least one argument` );
} )()
:
(() => {return (apply )(Math.max ,args );
} )());
} ) ;
let min  = ((...args ) => {return ((((empty__QUESTION_MARK__ )(args ) ) !== false && ((empty__QUESTION_MARK__ )(args ) ) !== null && ((empty__QUESTION_MARK__ )(args ) ) !== undefined) ?
(() => {return (raise )(`min requires at least one argument` );
} )()
:
(() => {return (apply )(Math.min ,args );
} )());
} ) ;
let int__QUESTION_MARK__  = ((n ) => {return (Number.isInteger )(n );
} ) ;
let float__QUESTION_MARK__  = ((n ) => {return (and )((number__QUESTION_MARK__ )(n ) ,(not )((__MINUS____GREATER_THAN__ )(n ,[__PERCENT__ ,1 ] ,zero__QUESTION_MARK__ ) ) );
} ) ;
let neg__QUESTION_MARK__  = ((n ) => {return (__LESS_THAN__ )(n ,0 );
} ) ;
let pos__QUESTION_MARK__  = ((n ) => {return (__GREATER_THAN__ )(n ,0 );
} ) ;
let rand  = Math.random ;
let rand__MINUS__int  = ((i ) => {return (__MINUS____GREATER_THAN__ )(i ,Math.floor ,[__ASTERISK__ ,(rand )() ] ,Math.floor );
} ) ;
let repeat  = ((a ,b ) => {return ((((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== false && ((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== null && ((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== undefined) ?
(() => {return (cons )(b ,(repeat )((dec )(a ) ,b ) );
} )()
:
(() => {return [];
} )());
} ) ;
let repeatedly  = ((a ,f ,...args ) => {return ((((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== false && ((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== null && ((__GREATER_THAN____EQUALS__ )(a ,1 ) ) !== undefined) ?
(() => {return (cons )((apply )(f ,args ) ,(apply )(repeatedly ,(dec )(a ) ,f ,args ) );
} )()
:
(() => {return [];
} )());
} ) ;
let complement  = ((f ) => {return ((...args ) => {return (not )((apply )(f ,args ) );
} );
} ) ;
let exp  = (new Object ()) ;
(map )(((curr ) => {((exp )[(curr )] = ((eval )((safe__MINUS__symbol )(curr ) ) ));
return ((exp )[((safe__MINUS__symbol )(curr ) )] = ((eval )((safe__MINUS__symbol )(curr ) ) ));
} ) ,[`=` ,`identical?!` ,`identity!` ,`coll?` ,`primitive?` ,`type` ,`or` ,`and` ,`zero?` ,`count` ,`empty?` ,`first` ,`ffirst` ,`second` ,`third` ,`last` ,`butlast` ,`rest` ,`next` ,`cons` ,`string?` ,`number?` ,`keyword?` ,`boolean?` ,`nil?` ,`set?` ,`map?` ,`array?` ,`arr` ,`array` ,`set` ,`hash-set` ,`hash-map` ,`tuples->map` ,`keys` ,`vals` ,`pairwise` ,`log` ,`+` ,`-` ,`*` ,`/` ,`%` ,`<` ,`<=` ,`>` ,`>=` ,`inc` ,`dec` ,`true?` ,`false?` ,`truthy?` ,`falsey?` ,`defined?` ,`undefined?` ,`not` ,`even?` ,`odd?` ,`apply` ,`map` ,`filter` ,`remove` ,`reduce` ,`reverse` ,`comp` ,`partial` ,`->` ,`->>` ,`raise` ,`get` ,`get-in` ,`contains?` ,`every?` ,`conj` ,`disj` ,`drop` ,`take` ,`flatten-1` ,`assoc` ,`assoc-in` ,`dissoc` ,`update` ,`update-in` ,`str` ,`max` ,`min` ,`int?` ,`float?` ,`neg?` ,`pos?` ,`rand` ,`rand-int` ,`repeat` ,`repeatedly` ,`complement` ] );
((module )[(`exports` )] = (exp ));
