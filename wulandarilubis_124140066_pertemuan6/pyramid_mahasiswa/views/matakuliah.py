from pyramid.view import view_config
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound

from ..models import Matakuliah

REQUIRED_FIELDS = ['kode_mk', 'nama_mk', 'sks', 'semester']


def _positive_int(value, field):
    """Validasi: harus integer > 0 (bool ditolak karena subclass int)"""
    if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
        raise ValueError(f'Field {field} harus berupa bilangan bulat positif')
    return value


def _not_found(mk_id):
    return HTTPNotFound(
        json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'})


def _get_json(request):
    try:
        data = request.json_body
    except ValueError:
        raise ValueError('Body request harus berupa JSON yang valid')
    if not isinstance(data, dict):
        raise ValueError('Body request harus berupa objek JSON')
    return data


# READ ALL
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    items = request.dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliah': [m.to_dict() for m in items]}


# READ ONE
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    mk_id = int(request.matchdict['id'])
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)
    return {'matakuliah': mk.to_dict()}


# CREATE
@view_config(route_name='matakuliah_add', renderer='json')
def matakuliah_add(request):
    dbsession = request.dbsession
    try:
        data = _get_json(request)

        for field in REQUIRED_FIELDS:
            if field not in data or data[field] in (None, ''):
                return HTTPBadRequest(
                    json_body={'error': f'Field {field} wajib diisi!'})

        sks = _positive_int(data['sks'], 'sks')
        semester = _positive_int(data['semester'], 'semester')

        # Cek duplikat kode_mk (hindari IntegrityError yang merusak transaksi)
        if dbsession.query(Matakuliah).filter_by(kode_mk=data['kode_mk']).first():
            return HTTPBadRequest(json_body={
                'error': f"Kode MK {data['kode_mk']} sudah terdaftar"})

        mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=sks,
            semester=semester,
        )
        dbsession.add(mk)
        dbsession.flush()   # supaya id terisi
        return {'success': True, 'matakuliah': mk.to_dict()}

    except ValueError as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# UPDATE
@view_config(route_name='matakuliah_update', renderer='json')
def matakuliah_update(request):
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)

    try:
        data = _get_json(request)

        if 'kode_mk' in data:
            if not data['kode_mk']:
                raise ValueError('Field kode_mk tidak boleh kosong')
            dup = (dbsession.query(Matakuliah)
                   .filter(Matakuliah.kode_mk == data['kode_mk'],
                           Matakuliah.id != mk.id).first())
            if dup:
                raise ValueError(f"Kode MK {data['kode_mk']} sudah terdaftar")
            mk.kode_mk = data['kode_mk']

        if 'nama_mk' in data:
            if not data['nama_mk']:
                raise ValueError('Field nama_mk tidak boleh kosong')
            mk.nama_mk = data['nama_mk']

        if 'sks' in data:
            mk.sks = _positive_int(data['sks'], 'sks')
        if 'semester' in data:
            mk.semester = _positive_int(data['semester'], 'semester')

        return {'success': True, 'matakuliah': mk.to_dict()}

    except ValueError as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# DELETE
@view_config(route_name='matakuliah_delete', renderer='json')
def matakuliah_delete(request):
    dbsession = request.dbsession
    mk_id = int(request.matchdict['id'])

    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk is None:
        return _not_found(mk_id)

    dbsession.delete(mk)
    return {'success': True,
            'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus'}