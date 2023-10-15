export type RequestPermissionParams = {
	nombreEmpleado: string;
	apellidoEmpleado: string;
	tipoPermisoNombre: string;
	fechaPermiso: Date;
};

export type ModifyPermissionParams = {
	id: number;
	nombreEmpleado: string;
	apellidoEmpleado: string;
	tipoPermisoNombre: string;
	fechaPermiso: Date;
};

export type TypePermissionTypes = {
	id: number;
	descripcion: string;
};

export type TypePermissions = {
	id: number;
	nombreEmpleado: string;
	apellidoEmpleado: string;
	fechaPermiso: Date;
	tipoPermiso: number;
	permissionTypes?: TypePermissionTypes;
};