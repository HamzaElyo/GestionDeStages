import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import adminService from '../../services/adminService';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDetailedStats();
        setStats(data.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des statistiques');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Chargement des statistiques...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h2>Statistiques et Rapports</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Répartition par statut</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.statusDistribution}>
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Candidatures par entreprise</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.applicationsByCompany}>
                  <XAxis dataKey="company" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Body>
          <Card.Title>Répartition par filière</Card.Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.studentsByField}>
              <XAxis dataKey="field" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Stats;